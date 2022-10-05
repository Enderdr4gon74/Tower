<template>
  <main class="container-fluid vh-100">
    <section class="row h-100">
      <div class="col-10 bg-dark">
        <router-view />
      </div>
      <div class="col-2 px-0 bg-darken">
        <Navbar />
      </div>
    </section>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.bg-darken {
  background: linear-gradient(#1f2b41 20%, #161e2d 80%); //#161e2d, #1f2b41;
  box-shadow: -0.125rem 0 0.75rem rgb(20, 20, 20);
}
</style>
