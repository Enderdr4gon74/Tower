<template>
  <span class="navbar-text py-0">
    <div class="btn text-success lighten-30 selectable text-uppercase px-4" v-if="!user.isAuthenticated"  @click="login" title="Login">
      Login
    </div>

    <div class="my-2 my-lg-0 d-flex flex-column align-items-center gap-2" v-else>
      <!-- <div aria-expanded="false" id="authDropdown">
        <div v-if="account.picture || user.picture">
          <img :src="account.picture || user.picture" alt="account photo" width="100" class="rounded" :title="account.name || user.name" />
        </div>
      </div> -->
      <div class="btn text-success lighten-30 selectable text-uppercase" @click="logout" title="Logout">
        <i class="mdi mdi-logout"></i>
        logout
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}

.dropdown-menu.show {
  transform: scale(1);
}

.hoverable {
  cursor: pointer;
}
</style>
