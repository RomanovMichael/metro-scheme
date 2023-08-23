<template>
  <div class="app-map" id="map" @click="renderPlacemarks()"></div>
</template>

<script>

import mapboxgl from '!mapbox-gl'; 


export default {
  name: 'AppMap',
  props: {
    msg: String
  },
  data() {
    return { 
      accessToken: process.env.VUE_APP_MAP_ACCESS_TOKEN,
      map:null
    }
  },
  computed: {
    arrayStations() {
      return this.$store.getters['getLocationsWithBranchColor']
    }
  },
  methods: {
    initMap() {
      mapboxgl.accessToken = this.accessToken;

      this.map = new mapboxgl.Map({
      container: "map",

      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [37.617698, 55.755864],
      zoom: 11,
      projection: 'globe'
      });
    },
    renderPlacemarks() {
      // this.arrayStations.forEach(station => {

      //   new mapboxgl.Marker()
      //   .setLngLat([station.lng, station.lat])
      //   .addTo(this.map)
      // });
      new mapboxgl.Marker()
      .setLngLat([37.617698, 55.755864])
      .addTo(this.map);
    }
  },
  async mounted() {
    this.initMap()

    this.map.on('load', async () => {
      this.map.setFog({})
      await this.$store.dispatch('getLocations')


      // добавить данные на карту
      // console.log('добавить данные на карту') 

    
    

      // this.renderPlacemarks()

    })


      //  this.renderPlacemarks()
      //  console.log('добавил метку')

  },
}
</script>

<style>
.app-map {
  height: 100vh;
  flex: 1;
}
</style>
