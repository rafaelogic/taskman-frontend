<template>
  <div class="container mx-auto pt-5">
    <Board msg="Taskman"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Board from '@/components/Board.vue'

export default {
  name: 'HomeView',
  components: {
    Board
  }
}
</script>
