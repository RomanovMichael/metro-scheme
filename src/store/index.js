import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    branches: null,
    enableFilter: false,
    search: ''
  },
  actions: {
    async getBranches({ commit }) {
      return new Promise((resolve, reject) => {
        fetch('./content/branches.json')
          .then(response => response.json())
          .then(result => {
            commit('UPDATE_BRANCHES', result)
            resolve()
          })
          .catch((error) => {
            console.error('Error:', error);
            reject()
          });
      })
    },
  },
  mutations: {
    UPDATE_BRANCHES(state, data) {
      state.branches = data
    },
    UPDATE_SEARCH(state, data) {
      state.search = data
    }
  },
  getters: {
    getStationsWithBranchColor(state) {
      if (state.branches == null) { return }

      const stationsWithBranchColor = state.branches.reduce((accumulator, currentBranch) => {
        const currentStation = currentBranch.stations.map(station => {

          let modifiedStation = {
            type: "Feature",
            properties: {
              color: `#${currentBranch.hex_color}`,
              order: station.order,
              name: station.name,
              admArea: station.admArea,
              district: station.district,
              status: station.status,
            },
            geometry: {
              coordinates: [station.lng, station.lat],
              type: "Point",
            }
          }
          return modifiedStation
        })
        return accumulator.concat(currentStation)
      }, []);

      const filteredStations = stationsWithBranchColor.filter(station => station.properties.name.toLowerCase().includes(state.search.toLowerCase()))

      const sortedStations = function sortArray(array) {
        if (state.search !== '') {
          array = filteredStations
        } else {
          array = stationsWithBranchColor
        }

        const sortedArray = array.sort((a, b) => {
          if (a.properties.name.toLowerCase() < b.properties.name.toLowerCase()) {
            return -1;
          }
          if (a.properties.name.toLowerCase() > b.properties.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        return sortedArray
      }

      return sortedStations()


      // const sortedStationsWithBranchColor = stationsWithBranchColor.sort((a, b) => {
      //   if (a.properties.name.toLowerCase() < b.properties.name.toLowerCase()) {
      //     return -1;
      //   }
      //   if (a.properties.name.toLowerCase() > b.properties.name.toLowerCase()) {
      //     return 1;
      //   }
      //   return 0;
      // });

      // return sortedStationsWithBranchColor


    }
  }
})