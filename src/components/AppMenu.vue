<template>
  <div class="app-menu">
    <div class="app-menu__search-wrap">
      <input type="text" @input="updateFilterValue" class="app-menu__search" />
    </div>
    <div class="app-menu__list" v-if="stations">
      <div
        class="app-menu__item"
        v-for="(item, index) in stations"
        :key="index"
      >
        <div
          class="app-menu__item-thumb"
          :style="{ backgroundColor: item.properties.color }"
        ></div>
        <div
          class="app-menu__item-title"
          v-html="item.properties.name"
          v-if="item.properties.name"
        ></div>
        <a href="#" @click.prevent="openPopup(item)" class="app-menu__item-clicker"></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppMenu",
  props: {
    msg: String,
  },
  data() {
    return {
      myStations: [],
    };
  },
  methods: {
    openPopup(item) {
      this.$store.dispatch('popupUpdate', {
        isOpen: true,
        content: {...item}
      });
    },
    updateFilterValue(e) {
      this.$store.commit("UPDATE_SEARCH", e.target.value);
    },
  },
  computed: {
    stations() {
      return this.$store.getters["getStationsWithBranchColor"];
    },
  },
};
</script>

<style>
.app-menu {
  height: 100vh;
  width: 25rem;
  background-color: white;
  flex-shrink: 0;
  overflow: scroll;
  padding-top: 2rem;
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

.app-menu__search-wrap {
  margin-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
}
.app-menu__search {
  width: 100%;
}

.app-menu__item {
  position: relative;
}

.app-menu__item-clicker {
  position: absolute;
  top: 0;
  left:0;
  width: 100%;
  height: 100%;
}
</style>
