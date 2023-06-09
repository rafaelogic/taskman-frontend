import Vue from "vue";
import Vuex from "vuex";

import * as auth from "@/store/modules/Auth";
import * as task from "@/store/modules/Task";
import * as user from "@/store/modules/User";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  modules: {
    auth,
    task,
    user,
  },
});