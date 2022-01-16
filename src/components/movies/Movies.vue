<template>
  <h1>ALL MOVIES</h1>
  <h2 v-if="loadingMovies">Loading.....</h2>
  <h2 v-if="errorMovies">Error.....</h2>
  <MoviesList v-if="!loadingMovies && !errorMovies">
    <MoviesListItem v-for="item in getAllMovies"
                    :key="item.id"
                    :item="item"
                    @click="linkCurrentMovie(item)"/>
  </MoviesList>
</template>

<script>
import MoviesList from "./MoviesList";
import MoviesListItem from "./MoviesListItem";
import {mapGetters, mapState} from "vuex";

export default {
  name: "Movies",

  components: {MoviesListItem, MoviesList},

  computed: {
    ...mapState('movies', ['loadingMovies', 'errorMovies']),
    ...mapGetters('movies', ['getAllMovies', 'getMovie']),
  },

  methods: {
    linkCurrentMovie(item) {
      this.$store.commit('setIdCurrentMovie', item.id)
      this.$router.push({path: `/${item.id}`})
      localStorage.setItem('getMovie', JSON.stringify(this.getMovie));
    }
  }
}
</script>

<style scoped>

</style>
