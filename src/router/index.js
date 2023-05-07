import Vue from 'vue'
import store from "@/store/index";
import VueRouter from 'vue-router'
import auth from '@/middlewares/auth';
import guest from '@/middlewares/guest';
import HomeView from '@/views/HomeView.vue'
import middlewarePipeline from '../router/middlewarePipeline'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {middleware: [auth]},
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta: {middleware: [guest, auth]},
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {middleware: [guest]},
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: () =>
      import(/* webpackChunkName: "not-found" */ "../views/NotFound"),
  },
]


const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
})

router.beforeEach((to, from, next) => {
  const middleware = to.meta.middleware;
  const context = { to, from, next, store };

  if (!middleware) {
    return next();
  }

  middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router
