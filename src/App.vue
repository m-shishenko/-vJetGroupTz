<template>
  <div class="container">
    <VHeader/>
    <router-view></router-view>
  </div>
</template>

<script>

import {mapState} from "vuex";
import VHeader from "./components/VHeader";

export default {
  name: 'App',
  components: {VHeader},
  computed: {
    ...mapState(['showModal'])
  },

  watch: {
    showModal() {
      this.showModal ? document.body.classList.add('hidden') : document.body.classList.remove('hidden')
    }
  },

  created() {
    this.$store.dispatch('movies/getDataMovies', '/movies')
    this.$store.dispatch('movieShows/getDataMovieShows', '/movieShows')
  },
};
</script>

<style lang="scss">
html {
  font-family: Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

dd {
  margin: 0;
}

button {
  cursor: pointer;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 50px;

  @media (max-width: 1023.9px) {
    padding: 0 25px;
  }

  @media (max-width: 575px) {
    padding: 0 10px;
  }
}

.hidden {
  overflow: hidden;
}
</style>
