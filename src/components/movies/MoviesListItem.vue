<template>
  <li class="item">
    <div class="item__img">
      <img :src="item.image"
           alt="">
    </div>
    <h2 class="item__title"
        v-html="item.name"></h2>
  </li>
</template>

<script>
export default {
  name: "MoviesListItem",

  props: {
    item: {
      type: Object,
      required: true
    }
  },
}
</script>

<style lang="scss"
       scoped>
.item {
  padding: 20px;
  background: #fff;
  border: 1px solid #000;
  border-radius: 20px;
  cursor: pointer;

  @media (any-hover: hover) {
    &:hover {
      transition: transform 0.4s;
      transform: scale(1.03);
      box-shadow: 0 0 50px 5px red;
    }
  }
}

.item__img {
  height: 350px;

  & img {
    width: auto;
    height: inherit;
    object-fit: cover;
  }

  @media (max-width: 1023.9px) {
    height: 250px;
  }
}
</style>
