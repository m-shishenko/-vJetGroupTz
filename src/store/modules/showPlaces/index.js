import axios from "@/api/api";

export default {
  namespaced: true,

  state: {
    loadingShowPlaces: false,
    errorShowPlaces: false,
    statusPlaces: false,
    showPlaces: null,
  },

  getters: {
    getShowPlaces: (state) => state.showPlaces?.data,
  },

  mutations: {
    setLoadingShowPlaces(state, payload) {
      state.loadingShowPlaces = payload;
    },

    setErrorShowPlaces(state, payload) {
      state.errorShowPlaces = payload;
    },

    setStatusPlaces(state, payload) {
      state.statusPlaces = payload;
    },

    setDataShowPlaces(state, payload) {
      state.showPlaces = payload;
    },
  },

  actions: {
    async getDataShowPlaces({ commit }, url) {
      commit("setLoadingShowPlaces", true);

      await axios
        .get(url)
        .then((res) => {
          commit("setLoadingShowPlaces", false);
          commit("setErrorShowPlaces", false);
          commit("setDataShowPlaces", res.data);
        })
        .catch((error) => {
          commit("setLoadingShowPlaces", false);
          commit("setErrorShowPlaces", true);
          console.log(error);
        });
    },
  },
};
