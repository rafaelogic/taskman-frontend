<template>
  <div class="mb-4 bg-white">
    <div
      class="h-56 border-2 rounded shadow-sm"
      :class="[`border-${borderColor}`]"
    >
      <div class="flex justify-between">
        <h3 class="p-2 mb-3 text-sm font-semibold text-gray-500">
          {{ task.title }}
        </h3>

        <div class="flex gap-2 p-2">
          <slot name="icons"></slot>
        </div>
      </div>
      <div class="flex flex-row items-center mt-2 mb-2">
        <p class="h-32 p-4 overflow-y-auto text-sm text-gray-600 text-light">
          {{ task.description }}
        </p>
      </div>
      <p class="mt-4 text-xs font-semibold text-gray-500">
        Due Date: {{ task.due_date }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "TaskCard",
  props: {
    bgColor: String,
    borderColor: String,
    task: Object,
  },
};
</script>
