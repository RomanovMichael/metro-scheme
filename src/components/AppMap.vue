<template>
  <div class="app-map" id="map" ></div>
</template>

<script>
import mapboxgl from "!mapbox-gl";

export default {
  name: "AppMap",
  props: {
    msg: String,
  },
  data() {
    return {
      accessToken: process.env.VUE_APP_MAP_ACCESS_TOKEN,
      map: null,
      myPoints: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      },
    };
  },
  watch: {
    '$store.state.search': function () { 
      this.map.setFilter('points',['in', this.$store.state.search.toLowerCase(), ['get', 'name']])
     }
  },
  computed: {
    arrayStations() {
      return this.$store.getters["getStationsWithBranchColor"];
    },
  },
  methods: {
    trimArray() {
      this.map.setFilter('points',['in', 'bal', ['get', 'name']])
    },
    initMap() {
      mapboxgl.accessToken = this.accessToken
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/dark-v10",
        center: [37.617698, 55.755864],
        zoom: 11,
        projection: "globe",
      });
    },
  },
  async mounted() {
    await this.$store.dispatch("getBranches");
    this.myPoints.data.features = this.arrayStations;
    this.initMap();

    this.map.on("load", async () => {
      this.map.setFog({});

      this.map.addSource("points", this.myPoints);
      this.map.addLayer({
        id: "points",
        type: "circle",
        source: "points",
        layout: {},
        paint: {
          "circle-color":["get", "color"],
          "circle-radius": 10,
        },
      });
    });
  },
  unmounted() {
    this.map.remove();
    this.map = null;
  },
};
</script>

<style>
.app-map {
  height: 100vh;
  flex: 1;
}
</style>



