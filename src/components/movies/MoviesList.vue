<template>
  <ul class="list">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: "MoviesList",
};
</script>

<style lang="scss"
       scoped>
.list {
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 50px;
  list-style: none;

  @media (max-width: 1023.9px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
}
</style>
