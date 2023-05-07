<template>
  <div class="mb-4">
    <div
      class="rounded shadow-sm border-2 h-56"
      :class="[`border-${borderColor}`]"
    >
      <div class="flex justify-between">
        <h3 class="text-sm mb-3 p-2 font-semibold text-gray-500">
          {{ task.title }}
        </h3>

        <div class="flex p-2 gap-2">
          <IconEdit />
          <form @submit.prevent="deleteTask(task)">
            <button class="py-2 px-1 hover:text-red-100"><IconTrash /></button>
          </form>
        </div>
      </div>
      <div class="flex flex-row items-center mt-2 mb-2">
        <p class="overflow-y-auto text-sm text-light text-gray-600 p-4 h-32">
          {{ task.description }}
        </p>
      </div>
      <p class="text-xs text-gray-500 mt-4 font-semibold">
        Due Date: {{ task.due_date }}
      </p>
    </div>
  </div>
</template>
<script>
import store from '@/store';
import IconEdit from './IconEdit.vue';
import IconTrash from './IconTrash.vue';

export default {
  name: "TaskCard",
  props: {
    bgColor: String,
    borderColor: String,
    task: Object,
  },
  components: {
    IconEdit, IconTrash
  },
  methods: {
    deleteTask: function(task) {
      store.dispatch('task/delete', task);
    }
  }
};
</script>
