<template>
  <div v-if="user.isAuthenticated" class="d-flex justify-content-center align-items-center">
    <div v-if="account.picture || user.picture">
      <img :src="account.picture || user.picture" alt="account photo" width="100" class="rounded" :title="account.name || user.name" />
    </div>
  </div>
</template>


<script>
import { computed } from 'vue'
import { AppState } from '../AppState'

export default {
  setup(){
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>