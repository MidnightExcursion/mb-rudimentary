<template>
  <div class="multiplayer">
    <Game />
  </div>
</template>

<script>
import Game from '@/components/Game.vue'

export default {
  name: 'OnlineView',
  components: {
      Game
  }
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
