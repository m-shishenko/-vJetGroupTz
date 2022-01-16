import axios from "@/api/api";

export default {
  namespaced: true,

  state: {
    loadingShows: false,
    errorShows: false,
    movieShows: null,
  },

  getters: {
    getAllMoviesShows: (state) => state.movieShows?.data,

    getMovieShow: (state, getters, rootState) => state.movieShows?.data[rootState.idCurrentMovie],
  },

  mutations: {
    setLoadingShows(state, payload) {
      state.loadingShows = payload
    },

    setErrorShows(state, payload) {
      state.errorShows = payload
    },

    setDataMovieShows(state, payload) {
      state.movieShows = payload
    },
  },

  actions: {
    async getDataMovieShows({commit}, url) {
      commit('setLoadingShows', true)

      await axios.get(url)
        .then(res => {
          commit('setLoadingShows', false)
          commit('setErrorShows', false)
          commit('setDataMovieShows', res.data)
        })
        .catch(error => {
          commit('setLoadingShows', false)
          commit('setErrorShows', true)
          console.log(error)
        })
    },
  }
};
