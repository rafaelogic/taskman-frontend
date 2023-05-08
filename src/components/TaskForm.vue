<template>
  <div class="w-full max-w-xs">
    <FlashMessage :error="error" />

    <form
      @submit.prevent="submitTaskData"
      class="px-8 py-4 bg-white rounded shadow-md"
    >
      <div class="mb-4">
        <label class="block mb-2 text-sm font-bold text-gray-700" for="title">
          Title
        </label>
        <input
          class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Title"
          v-model="form.title"
        />

        <label
          class="block mt-2 mb-2 text-sm font-bold text-gray-700"
          for="description"
        >
          Description
        </label>
        <textarea
          id="description"
          class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          v-model="form.description"
          rows="10"
        >
        </textarea>
        <label
          class="block mt-2 mb-2 text-sm font-bold text-gray-700"
          for="dueDate"
        >
          Due Date
        </label>
        <input
          class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="dueDate"
          type="text"
          placeholder="2023-01-31"
          v-model="form.due_date"
        />
      </div>
      <div class="relative inline-block w-64">
        <select
          v-model="form.status"
          class="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
        >
          <option value="Todo">Todo</option>
          <option value="InProgress">In-Progress</option>
          <option value="Done">Done</option>
        </select>
        <div
          class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none"
        >
          <svg
            class="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>
      <button
        type="button"
        class="p-2 mt-4 text-white bg-green-400 rounded"
        @click="submitTaskData"
      >
        Submit
      </button>
    </form>
  </div>
</template>
<script>
import store from "@/store";
import { mapGetters } from "vuex";
import FlashMessage from "./FlashMessage.vue";

export default {
  props: {
    task: Object,
  },
  components: {
    FlashMessage
  },
  data() {
    return {
      form: {
        title: this.task?.title || "",
        description: this.task?.description || "",
        due_date: this.task?.due_date || "",
        status: this.task?.status || "",
      },
    };
  },
  computed: {
    ...mapGetters('task', ['error']),
  },
  methods: {
    submitTaskData: function () {
      if (this.task) {
        const payload = {
            id: this.task.id,
            data: this.form,
        };
        store.dispatch("task/update", payload);
      } else {
        store.dispatch('task/create', this.form);
      }
    },
  },
};
</script>
