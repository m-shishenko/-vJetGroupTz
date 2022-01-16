import {createStore} from "vuex";

import movies from '@/store/modules/movies'
import movieShows from '@/store/modules/movieShows'
import showPlaces from '@/store/modules/showPlaces'

export default createStore({
  strict: process.env.NODE_ENV !== "production",

  state: {
    showModal: false,
    idCurrentMovie: null,
  },

  mutations: {
    toggleShowModal(state) {
      state.showModal = !state.showModal
    },

    setIdCurrentMovie(state, payload) {
      state.idCurrentMovie = payload
    },
  },

  modules: {
    movies,
    movieShows,
    showPlaces
  },
});
