<template>
  <main class="container-fluid vh-100">
    <section class="row h-100">
      <div class="col-10 bg-dark overflow-auto vh-100">
        <router-view />
      </div>
      <div class="col-2 px-0 bg-darken vh-100">
        <Navbar />
      </div>
    </section>


    <div class="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasDark" aria-labelledby="offcanvasDarkLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasDarkLabel">Create Event</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <EventForm />
      </div>
    </div>
  </main>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import EventForm from './components/EventForm.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState),
    }
  },
  components: { Navbar, EventForm }
}

</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.bg-darken {
  background: linear-gradient(#1f2b41 20%, #161e2d 80%); //#161e2d, #1f2b41;
  box-shadow: -0.125rem 0 0.75rem rgb(20, 20, 20);
}

.vh-100 {
  height: 100vh;
}

::-webkit-scrollbar {
  display: none;
}
</style>