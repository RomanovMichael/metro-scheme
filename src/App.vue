
<template>
  <div class="app" id="app">
    <AppMenu />
    <AppMap />
    <AppPopup v-if="$store.state.popup.isOpen"/>
  </div>
</template>

<script>
import AppMap from './components/AppMap.vue'
import AppMenu from './components/AppMenu.vue'
import AppPopup from './components/AppPopup.vue'

export default {
  name: 'App',
  components: {
    AppMap,
    AppMenu,
    AppPopup
  } 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app {
  display: flex;
  flex-wrap: nowrap;
}

.no-scroll {
  overflow: hidden;
}
</style>
