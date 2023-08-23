<template>
  <div class="app-menu">
    <div class="app-menu__list" v-if="stations">
      <div class="app-menu__item" @click="rrr()" v-for="item in stations" :key="item.order">
        <div class="app-menu__item-thumb" :style="{backgroundColor: '#' + item.hex_color}"></div>
        <div class="app-menu__item-title" v-html="item.name" v-if="item.name"></div>
      </div>
    </div>
  </div>
</template>

<script>




export default {
  name: 'AppMenu',
  props: {
    msg: String
  },
  data() {
    return { 
      // foo: ''
    }
  },
  computed: { 
    stations() {
      return this.$store.getters['getLocationsWithBranchColor']
    },
  },
  methods: {
  },
  mounted() {
    
  }
}
</script>

<style>

.app-menu {
  height: 100vh;
  width: 25rem;
  background-color: white;
  flex-shrink: 0;
  overflow: scroll;
}
.app-menu__list {
  min-height: 100vh;
  padding: 0 2rem;

}

.app-menu__item {
  padding: 1rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-menu__item:hover .app-menu__item-title {

} 

.app-menu__item-thumb {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  /* background-color: red; */
}


</style>
