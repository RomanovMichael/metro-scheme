import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locations: null,
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
     
     // eslint-disable-next-line
      let newArr = state.locations.reduce((accumulator, currentBranch, index) => {

        let modStations = currentBranch.stations.map(station =>  {
          return { ...station, hex_color: currentBranch.hex_color, order: index + 1}
        })

        return accumulator.concat(modStations)
      }, [])

      const newArrSorted = newArr.sort((a, b) => {

        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
        });

      return newArrSorted
     }
  }
})