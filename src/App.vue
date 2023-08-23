
<template>
  <div class="app" id="app">
    <AppMenu />
    <AppMap />
  </div>
</template>

<script>
import AppMap from './components/AppMap.vue'
import AppMenu from './components/AppMenu.vue'

export default {
  name: 'App',
  components: {
    AppMap,AppMenu
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
</style>
