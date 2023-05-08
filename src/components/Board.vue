<template>
  <div>
    <h1 class="mb-5 text-4xl text-light">{{ msg }}</h1>

    <Modal v-if="showModal" @close="showModal = false">
      <template v-slot:header>
        <span class="text-lg font-semibold">{{ modalHeader }}</span>
      </template>
      <template v-slot:body>
        <TaskForm :task="taskData"/>
      </template>
    </Modal>

    <div class="h-screen p-2">
      <div class="grid grid-flow-row grid-cols-3 gap-5 auto-rows-max">
        <div class="px-2 py-2 bg-gray-100 rounded">
          <TaskType taskType="Todo" color="red-400" :taskCount="15" />
          <draggable v-model="todoTasks" group="tasklists">
            <TaskCard
              v-for="task in todoTasks"
              :key="task.title"
              :task="task"
              borderColor="red-400"
            >
              <template v-slot:icons>
                <button class="px-1 py-2" @click="updateTask(task)">
                  <IconEdit />
                </button>
                <button class="px-1 py-2" @click="deleteTask(task)">
                    <IconTrash />
                  </button>
              </template>
            </TaskCard>
          </draggable>

          <AppTaskButtonAddons>
            <template v-slot:buttonArea>
              <p class="mr-2 text-2xl rounded">+</p>
              <button class="pt-1 text-sm rounded" @click="createTask">New</button>
            </template>
          </AppTaskButtonAddons>
        </div>

        <div class="px-2 py-2 bg-gray-100 rounded">
          <TaskType taskType="In-Progress" color="blue-400" :taskCount="0" />

          <draggable v-model="wipTasks" group="tasklists">
            <TaskCard
              v-for="task in wipTasks"
              :key="task.title"
              :task="task"
              borderColor="blue-400"
            >
            <template v-slot:icons>
                <button class="px-1 py-2" @click="updateTask(task)">
                  <IconEdit />
                </button>
                <button class="px-1 py-2" @click="deleteTask(task)">
                    <IconTrash />
                  </button>
              </template>
            </TaskCard>
          </draggable>

          <AppTaskButtonAddons>
            <template v-slot:buttonArea>
              <p class="mr-2 text-2xl rounded">+</p>
              <button class="pt-1 text-sm rounded" @click="createTask">New</button>
            </template>
          </AppTaskButtonAddons>
        </div>

        <div class="px-2 py-2 bg-gray-100 rounded">
          <TaskType taskType="Done" color="green-400" :taskCount="0" />
          <draggable v-model="doneTasks" group="tasklists">
            <TaskCard
              v-for="task in doneTasks"
              :key="task.title"
              :task="task"
              borderColor="green-400"
            >
            <template v-slot:icons>
                <button class="px-1 py-2" @click="updateTask(task)">
                  <IconEdit />
                </button>
                <button class="px-1 py-2" @click="deleteTask(task)">
                    <IconTrash />
                  </button>
              </template>
            </TaskCard>
          </draggable>
          <AppTaskButtonAddons>
            <template v-slot:buttonArea>
              <p class="mr-2 text-2xl rounded">+</p>
              <button class="pt-1 text-sm rounded" @click="createTask">New</button>
            </template>
          </AppTaskButtonAddons>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import draggable from "vuedraggable";

import AppTaskButtonAddons from "@/components/AppTaskButtonAddons.vue";
import TaskCard from "@/components/TaskCard.vue";
import TaskType from "@/components/TaskType.vue";
import Modal from "./AppModal.vue";
import TaskForm from "./TaskForm.vue";
import IconEdit from "./IconEdit.vue";
import IconTrash from "./IconTrash.vue";

export default {
  name: "BoardView",
  props: {
    msg: String,
  },
  components: {
    draggable,
    AppTaskButtonAddons,
    IconEdit,
    IconTrash,
    Modal,
    TaskCard,
    TaskForm,
    TaskType,
  },
  data() {
    return {
      showModal: false,
      taskData: null,
      modalHeader: '',
    };
  },
  beforeCreate: function () {
    store.dispatch("task/getTasks");
  },
  computed: {
    todoTasks: {
      get() {
        return store.getters["task/todoTasks"];
      },
      set(newTodos) {
        return store.dispatch("task/updateTodoTaskList", newTodos);
      },
    },
    wipTasks: {
      get() {
        return store.getters["task/wipTasks"];
      },
      set(newWips) {
        return store.dispatch("task/updateWipTaskList", newWips);
      },
    },
    doneTasks: {
      get() {
        return store.getters["task/doneTasks"];
      },
      set(newDones) {
        return store.dispatch("task/updateDoneTaskList", newDones);
      },
    },
  },
  methods: {
    createTask: function () {
      this.taskData = null;
      this.showModal = true;
      this.modalHeader = 'Create New Task'
    },
    updateTask: function (task) {
      this.taskData = task;
      this.showModal = true;
      this.modalHeader = 'Edit Task'
      
    },
    deleteTask: function (task) {
      store.dispatch("task/delete", task);
    },
  },
};
</script>
