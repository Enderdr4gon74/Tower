<template>
<!-- <router-link > -->
  <div class="col-4 p-3 px-0 position-relative selectable d-flex flex-column align-items-center" @click="goToDetails(eventItem.id)">
    <img v-if="eventItem.coverImg" :src="eventItem.coverImg" :alt="eventItem.name" class="img-fluid w-spec rounded" :title="eventItem.name">
    <img v-else src="https://media1.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif?cid=6c09b952um0m52mj4i3ec61o3vz9jy1wu7vcresa4fjvnyeu&rid=giphy.gif&ct=s" alt="loading..." class="img-fluid w-spec rounded">
    <div class="body-tr position-absolute bottom-5 w-spec p-2 rounded-bottom">
      <h4 class="mb-1">{{eventItem.name}}</h4>
      <p class="m-0">{{eventItem.location}}</p>
      <p class="m-0">{{eventItem.startDateFull}}</p>
      <p class="text-end m-0">{{eventItem.capacity}} spots left</p>
    </div>
  </div>
<!-- </router-link> -->
</template>


<script>
import { Event } from '../models/Event.js';
import { router } from '../router.js';
export default {
  props: {
    eventItem: {type: Event, required: true}
  },
  setup(){
    return {
      goToDetails(eventId) {
        router.push({name: 'Details', params: {id: eventId}})
      }
    }
  }
}
</script>


<style lang="scss" scoped>

.body-tr {
  background-color: rgba(48, 45, 45, 0.712);
}

.w-spec {
  width: 95%;
}

.bottom-5 {
  bottom: 4%;
}
</style>