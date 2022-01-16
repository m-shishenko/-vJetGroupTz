<template>
  <main>
    <h1 v-html="getMovie.name"></h1>
    <section class="movie">
      <div class="movie__img">
        <img :src="getMovie.image"
             alt="images">
      </div>
      <div class="movie__body">
        <p class="movie__description"
           v-html="getMovie.description"></p>
        <div class="movie__additional"
             v-html="getMovie.additional"></div>
      </div>
      <div class="movie__sessions">
        <h2>SESSIONS</h2>
        <h2 v-if="loadingShows">Loading.....</h2>
        <h2 v-if="errorShows">Error.....</h2>
        <ul class="movie__sessions-list"
            v-if="!loadingShows && !errorShows">
          <li v-for="item in getMovieShow"
              :key="item.showdate">
            <dl>
              <dt>{{ item.showdate }}</dt>
              <dd>
                <ul>
                  <li v-for="item2 in item.daytime.split(';')"
                      :key='item2'>
                    <button @click="changeBookTicket(item.showdate, item2)">{{ item2 }}</button>
                  </li>
                </ul>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
    </section>
    <VModal>
      <h2>
        <span v-html="getMovie.name"></span>
        <br>
        <span>{{ bookTicket.showdate }}</span>
        <br>
        <span>{{ bookTicket.daytime }}</span>
      </h2>
      <h2 v-if="loadingShowPlaces && !statusPlaces">Loading.....</h2>
      <h2 v-if="errorShowPlaces">Error.....</h2>
      <h2 v-if="statusPlaces">thanks for the place</h2>
      <ul class="movie__modal-list"
          v-if="!loadingShowPlaces && !errorShowPlaces && !statusPlaces">
        <li v-for="(item, i) in getShowPlaces"
            :key="i">
          <span>row-{{ item[0].row }}</span>
          <ul>
            <li v-for="(item2, i2) in item[1]"
                :key="i2">
              <button :disabled="!item2.is_free"
                      @click="postTicket(item[0].row, item2.seat)">{{ item2.seat }}
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </VModal>
  </main>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import VModal from "../components/VModal";
import axios from "@/api/api";

export default {
  name: "Movie",
  components: {VModal},
  data: () => ({
    bookTicket: {}
  }),

  computed: {
    ...mapState('movieShows', ['loadingShows', 'errorShows']),
    ...mapState('showPlaces', ['loadingShowPlaces', 'errorShowPlaces', 'statusPlaces']),
    ...mapGetters('showPlaces', ['getShowPlaces']),
    ...mapGetters('movieShows', ['getMovieShow']),

    getMovie() {
      return JSON.parse(localStorage.getItem('getMovie'))
    }
  },

  created() {
    this.$store.commit('setIdCurrentMovie', this.$route.params.id)
  },

  methods: {
    changeBookTicket(showdate, daytime) {
      this.$store.dispatch('showPlaces/getDataShowPlaces', `/showPlaces?movie_id=${this.$route.params.id}&daytime=${daytime}&showdate=${showdate}`)
      this.$store.commit('toggleShowModal')

      this.bookTicket = {
        movie_id: this.$route.params.id,
        showdate: showdate,
        daytime: daytime
      }
    },

    postTicket(row, seat) {
      this.bookTicket = {
        ...this.bookTicket,
        row,
        seat,
      }

      axios.post('/bookPlace', this.bookTicket)
        .then(() => {
          this.$store.dispatch('showPlaces/getDataShowPlaces', `/showPlaces?movie_id=${this.$route.params.id}&daytime=${this.bookTicket.daytime}&showdate=${this.bookTicket.showdate}`)
        })

      this.$store.commit('showPlaces/setStatusPlaces', true)
      setTimeout(() => {
        this.$store.commit('showPlaces/setStatusPlaces', false)
      }, 1000)
    }
  }
}
</script>

<style lang="scss"
       scoped>
.movie {
  display: flex;
  flex-wrap: wrap;
}

.movie__img {
  flex: 0 1 30%;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;

    @media (max-width: 767.9px) {
      width: 250px;
    }
  }

  @media (max-width: 767.9px) {
    margin-bottom: 20px;
    flex: 1 1 100%;
  }
}

.movie__body {
  padding-left: 50px;
  flex: 0 1 70%;

  @media (max-width: 767.9px) {
    padding: 0;
    flex: 1 1 100%;
  }
}

.movie__sessions {
  flex: 1 1 100%;
}

.movie__additional::v-deep {
  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;

    @media (max-width: 1023.9px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .key {
    font-size: 22px;
    font-weight: 700;
  }
}

.movie__sessions-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  @media (max-width: 767.9px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.movie__modal-list {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  overflow: auto;
}
</style>
