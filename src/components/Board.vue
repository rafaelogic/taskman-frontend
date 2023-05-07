<template>
  <div>
    <h1 class="text-light text-4xl mb-5">{{ msg }}</h1>
    <div class="h-screen p-2">
      <div
        class="grid grid-cols-3 gap-5 grid-flow-row auto-rows-max"
      >
        <div class="bg-gray-100 rounded px-2 py-2">
          <TaskType
            taskType="Todo"
            color="red-400"
            :taskCount="15"
          />
            <draggable v-model="todoTasks" group="tasklists">
              <TaskCard
                v-for="task in todoTasks"
                :key="task.title"
                :task="task"
                borderColor="red-400"
              />
            </draggable>

          <AppNewTaskButton />
        </div>

        <div class="bg-gray-100 rounded px-2 py-2">
          <TaskType
            taskType="In-Progress"
            color="blue-400"
            :taskCount="0"
          />

            <draggable v-model="wipTasks" group="tasklists" >
              <TaskCard
                v-for="task in wipTasks"
                :key="task.title"
                :task="task"
                borderColor="blue-400"
              />
            </draggable>

          <!-- <AppNewTaskButton /> -->
        </div>

        <div class="bg-gray-100 rounded px-2 py-2">
          <TaskType
            taskType="Done"
            color="green-400"
            :taskCount="0"
          />
            <draggable v-model="doneTasks" group="tasklists">
              <TransitionGroup>
                <TaskCard
                  v-for="task in doneTasks"
                  :key="task.title"
                  :task="task"
                  borderColor="green-400"
                />
              </TransitionGroup>
            </draggable>
          <AppNewTaskButton />
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import draggable from "vuedraggable";

import AppNewTaskButton from "@/components/AppNewTaskButton.vue";
import TaskCard from "@/components/TaskCard.vue";
import TaskType from "@/components/TaskType.vue";

export default {
  name: "BoardView",
  props: {
    msg: String,
  },
  components: {
    draggable,
    AppNewTaskButton,
    TaskCard,
    TaskType,
  },
  beforeCreate: function () {
    store.dispatch("task/getTasks");
  },
  computed: {
    todoTasks: {
      get() {
        return store.getters['task/todoTasks'];
      },
      set(newTodos) {
        return store.dispatch('task/updateTodoTaskList', newTodos)
      }
    },
    wipTasks: {
      get() {
        return store.getters['task/wipTasks'];
      },
      set(newWips) {
        return store.dispatch('task/updateWipTaskList', newWips)
      }
    },
    doneTasks: {
      get() {
        return store.getters['task/doneTasks'];
      },
      set(newDones) {
        return store.dispatch('task/updateDoneTaskList', newDones)
      }
    },
  },
};
</script>
