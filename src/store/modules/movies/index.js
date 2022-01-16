import axios from "@/api/api";

export default {
  namespaced: true,

  state: {
    loadingMovies: false,
    errorMovies: false,
    dataMovies: null,
  },

  getters: {
    getAllMovies: (state) => state.dataMovies?.data,

    getMovie: (state, getters, rootState) => getters.getAllMovies.filter(item => item.id === rootState.idCurrentMovie)[0],
  },

  mutations: {
    setLoadingMovies(state, payload) {
      state.loadingMovies = payload
    },

    setErrorMovies(state, payload) {
      state.errorMovies = payload
    },

    setDataMovies(state, payload) {
      state.dataMovies = payload
    },
  },

  actions: {
    async getDataMovies({commit}, url) {
      commit('setLoadingMovies', true)

      await axios.get(url)
        .then(res => {
          commit('setLoadingMovies', false)
          commit('setErrorMovies', false)
          commit('setDataMovies', res.data)
        })
        .catch(error => {
          commit('setLoadingMovies', false)
          commit('setErrorMovies', true)
          console.log(error)
        })
    },
  }
};
