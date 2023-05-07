<template>
  <div class="flex flex-row justify-between items-center mb-2 mx-1">
    <div class="flex items-center bg-black">
      <h2 class="text-sm w-max p-2 mr-2 text-black-700" :class="[`bg-${color}`]">
        {{ taskType }}
      </h2>
      <p class="text-white mr-2 rounded-full text-sm">{{ taskCount }}</p>
    </div>
    <div class="flex items-center text-gray-300">
      <p class="mr-2 text-2xl">---</p>
      <p class="text-2xl">+</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'TaskType',
    props: {
        color: {
          type: String,
          default: 'gray-400'
        },
        taskType: String,
        taskCount: Number
    }
}
</script>
