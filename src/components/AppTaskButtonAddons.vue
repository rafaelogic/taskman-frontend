<template>
  <div
    class="flex flex-row items-center px-1 mt-2 text-gray-300 hover:text-gray-700"
  >
    <slot name="buttonArea"></slot>
  </div>
</template>
<script>
export default {
    name: 'AppNewTaskButton'
}
</script>