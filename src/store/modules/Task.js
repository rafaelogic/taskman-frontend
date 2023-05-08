import { getError } from "@/utils/helpers";
import TaskService from "@/services/TaskService";

export const namespaced = true;

export const state = {
  task: null,
  todoTasks: [],
  wipTasks: [],
  doneTasks: [],
  loading: false,
  error: null,
};

export const mutations = {
  SET_TASK(state, task) {
    state.task = task;
  },
  SET_TASKS(state, task) {
    switch(task.status) {
      case 'Todo':
        state.todoTasks = state.todoTasks.filter(todo => todo.id !== task.id);
        break;
      case 'InProgress':
        state.wipTasks = state.wipTasks.filter(wip => wip.id !== task.id);
        break;
      case 'Done':
        state.doneTasks = state.doneTasks.filter(done => done.id !== task.id);
        break;

      default:
        break;
    }
  },
  SET_TODO_TASKS(state, payload) {
    let todoList = [];

    if (payload.isRtu) {
      todoList = payload.tasks;
    } else if(payload) {
      todoList = payload.filter((task) => task.status === "Todo");
    }

    state.todoTasks = todoList;
  },
  SET_WIP_TASKS(state, payload) {
    let wipList = [];

    if (payload.isRtu) {
      wipList = payload.tasks;
    } else if(payload) {
      wipList = payload.filter((task) => task.status === "InProgress");
    }

    state.wipTasks = wipList;
  },
  SET_DONE_TASKS(state, payload) {
    let doneList = [];

    if (payload.isRtu) {
      doneList = payload.tasks;
    } else if(payload) {
      doneList = payload.filter((task) => task.status === "Done");
    }

    state.doneTasks = doneList;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
};

export const actions = {
  updateTodoTaskList({commit}, tasks) {
    commit('SET_TODO_TASKS', {tasks, isRtu: true});
  },
  updateWipTaskList({commit}, tasks) {
    commit('SET_WIP_TASKS', {tasks, isRtu: true});
  },
  updateDoneTaskList({commit}, tasks) {
    commit('SET_DONE_TASKS', {tasks, isRtu: true});
  },
  getTask({ commit }, taskId) {
    commit("SET_LOADING", true);
    TaskService.getTask(taskId)
      .then((res) => {
        commit("SET_TASK", res.data);
        commit("SET_LOADING", false);
      })
      .catch((err) => {
        commit("SET_LOADING", false);
        commit("SET_ERROR", getError(err));
      });
  },
  getTasks({ commit }) {
    commit("SET_LOADING", true);
    TaskService.getTasks()
      .then((res) => {
        commit("SET_TODO_TASKS", res.data.data);
        commit("SET_WIP_TASKS", res.data.data);
        commit("SET_DONE_TASKS", res.data.data);
        commit("SET_LOADING", false);
      })
      .catch((err) => {
        commit("SET_LOADING", false);
        commit("SET_ERROR", getError(err));
      });
  },
  updateStatus({ commit }, task) {
    commit("SET_LOADING", true);
    TaskService.updateTaskStatus(task)
      .then((res) => {
        commit("SET_TODO_TASKS", res.data.data);
        commit("SET_WIP_TASKS", res.data.data);
        commit("SET_DONE_TASKS", res.data.data);
        commit("SET_LOADING", false);
      })
      .catch((err) => {
        commit("SET_LOADING", false);
        commit("SET_ERROR", getError(err));
      });
  },
  delete({ commit }, task) {
    TaskService.deleteTask(task)
      .then(() => {
        commit("SET_LOADING", false);
        commit('SET_TASKS', task);
      })
      .catch((err) => {
        commit("SET_LOADING", false);
        commit("SET_ERROR", getError(err));
      });
  },
  update({ commit }, payload) {
    TaskService.updateTask(payload)
      .then((res) => {
        commit('SET_TASK', res.data.data);
      })
      .catch((err) => {
        commit("SET_LOADING", false);
        commit("SET_ERROR", getError(err));
      });
  },
  create({ commit }, payload) {
    TaskService.createTask(payload)
      .then((res) => {
        commit('SET_TASK', res.data.data);
      })
      .catch((err) => {
        commit("SET_LOADING", false);
        commit("SET_ERROR", getError(err));
      });
  }
};

export const getters = {
  error: (state) => state.error,
  loading: (state) => state.loading,
  task: (state) => state.task,
  todoTasks: (state) => state.todoTasks,
  wipTasks: (state) => state.wipTasks,
  doneTasks: (state) => state.doneTasks,
};
