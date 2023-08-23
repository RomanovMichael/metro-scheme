import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locations: null
  },
  actions: {
    async getLocations({commit}) {
      return new Promise(function(resolve, reject) {
        fetch('./content/locations.json')
        .then(response => response.json())
        .then(result =>
          {
            commit('UPDATE_LOCATIONS', result)
            resolve()
          })
        .catch((error) => {
          console.error('Error:', error);
          reject()
        });
      })
    }
  },
  mutations: {
    UPDATE_LOCATIONS(state, data) {
      state.locations = data
    }
  },
  getters: {
    getLocationsWithBranchColor(state) {

      if(state.locations == null) { return }

      let locationsWithBranchColor = state.locations.map( function(branch) {

        const newStations = branch.stations.map(station => {
          return { ...station, hex_color : branch.hex_color }
        });

        return newStations

      })
      return locationsWithBranchColor.flat()
    }
  }
})