<template>
  <div class="app-map" id="map"></div>
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
      layer: {
        id: "points",
        type: "circle",
        source: "points",
        layout: {},
        paint: {
          "circle-color": ["get", "color"],
          "circle-radius": 10,
        },
      },
      featID: null,
    };
  },
  watch: {
    "$store.state.search": function () {
      this.myPoints.data.features = this.arrayStations;
      this.map.removeLayer("points");
      this.map.removeSource("points");
      this.map.addSource("points", this.myPoints);
      this.map.addLayer(this.layer);
    },
  },
  computed: {
    arrayStations() {
      return this.$store.getters["getStationsWithBranchColor"];
    },
  },
  methods: {
    // convertCoords(coords) {
    //   let convertedCoords = [];
    //   for (const coord of Object.entries(coords)) {
    //     const trimedCoord = coord[1].toFixed(1);
    //     convertedCoords.push(trimedCoord);
    //   }
    //     console.log(convertedCoords)
    //   return JSON.stringify(convertedCoords);
    // },
    initMap() {
      mapboxgl.accessToken = this.accessToken;
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
      this.map.addLayer(this.layer);

      this.map.on("click", "points", (e) => {
        const curentGeoObject = this.arrayStations.find(
          (station) =>
           JSON.stringify([station.geometry.coordinates[0].toFixed(1), station.geometry.coordinates[1].toFixed(1)]) ===
            JSON.stringify([e.lngLat.lng.toFixed(1),e.lngLat.lat.toFixed(1)])
        );
        // хотел унифицированной функцией сравнить но коряво получается в который раз 
        // const curentGeoObject = this.arrayStations.find(
        //   (station) =>
        //     this.convertCoords(station.geometry.coordinates) ===
        //     this.convertCoords(e.lngLat)
        // );
        this.$store.dispatch("popupUpdate", {
          isOpen: true,
          content: { ...curentGeoObject },
        });
      });

      this.map.on("mousemove", "points", () => {
        this.map.getCanvas().style.cursor = "pointer";

        if (this.featID) {
          this.map.removeFeatureState({
            source: "points",
            id: this.featID,
          });
        }

        this.map.setFeatureState(
          {
            source: "points",
            id: this.featID,
          },
          {
            hover: true,
          }
        );
      });
    });

    this.map.on("mouseleave", "points", () => {
      if (this.featID) {
        this.map.setFeatureState(
          {
            source: "points",
            id: this.featID,
          },
          {
            hover: false,
          }
        );
      }

      this.featID = null;

      this.map.getCanvas().style.cursor = "";
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



