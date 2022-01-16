<template>
  <div class="modal"
       v-if="showModal"
       @click.self="toggleShowModal">
    <div class="modal__wrapper">
      <button class="modal__close"
              @click="toggleShowModal">X
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
  name: "VModal",

  computed: {
    ...mapState(['showModal'])
  },

  methods: {
    ...mapMutations(['toggleShowModal'])
  }
}
</script>

<style lang="scss"
       scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  background: rgba(#000, .7);
}

.modal__wrapper {
  margin: auto;
  max-width: 80vw;
  max-height: 80vh;
  background: #fff;
  border-radius: 30px;
  padding: 30px;
  overflow-y: auto;
}
</style>
