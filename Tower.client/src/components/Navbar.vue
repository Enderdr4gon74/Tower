<template>
  <nav class="navbar navbar-expand-lg px-3 d-flex flex-column py-3">
    <div class="gap-2 d-flex flex-column">
      <User />
      <router-link class="btn text-success lighten-30 selectable text-uppercase" :to="{ name: 'Home' }">
        Home
      </router-link>
      <!-- <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
        <span class="navbar-toggler-icon"></span>
      </button> -->
      <router-link v-if="user.isAuthenticated" class="btn text-success lighten-30 selectable text-uppercase" :to="{ name: 'Account' }">
        Account
      </router-link>

      <button v-if="user?.isAuthenticated" class="btn bg-success lighten-30 selectable text-uppercase">New event</button>

      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import Login from './Login.vue'
import User from './User.vue';
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
    }
  },
  components: { Login, User }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.bg-success:hover {
  background-color: rgba(0,0,0,0) !important;
  color: #92ffbf !important;
}
</style>
