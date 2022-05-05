<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer></footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
span {
  font-family: "Exo", Arial, Helvetica, sans-serif, sans-serif;
}
p {
  font-family: "Exo", Arial, Helvetica, sans-serif, sans-serif;
}

h1 {
  font-family: "Exo", Arial, Helvetica, sans-serif, sans-serif;
}
h5 {
  font-family: "Exo", Arial, Helvetica, sans-serif, sans-serif;
}
@import "./assets/scss/main.scss";
</style>
