<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/">MOVIES</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "VHeader"
}
</script>

<style lang="scss"
       scoped>
ul {
  list-style: none;
}
</style>
