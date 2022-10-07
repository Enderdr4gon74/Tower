<template>
<!-- <router-link > -->
  <router-link class="col-4 p-3 px-0 position-relative selectable d-flex flex-column align-items-center text-light" :to="{name: 'Details', params: {id: eventItem.id}}">
    <img v-if="eventItem.coverImg" :src="eventItem.coverImg" :alt="eventItem.name" class="img-spec h-spec w-spec rounded" :title="eventItem.name">
    <img v-else src="https://media1.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif?cid=6c09b952um0m52mj4i3ec61o3vz9jy1wu7vcresa4fjvnyeu&rid=giphy.gif&ct=s" alt="loading..." class="img-fluid w-spec rounded">
    <div class="body-tr position-absolute bottom-5 w-spec p-2 rounded-bottom d-flex flex-column justify-content-between">
      <div>
        <h4 class="mb-1">{{eventItem.name}}</h4>
        <p class="m-0">{{eventItem.location}}</p>
        <!-- <p class="m-0">{{eventItem.startDateFull}}</p> -->
      </div>
      <div class="d-flex" v-if="eventItem.isCanceled">
        <div class="bg-danger text-dark w-100 d-flex justify-content-center p-1 rounded-2">
          <p class="m-0">Canceled</p>
        </div>
      </div>
      <div class="d-flex" v-else>
        <p v-if="eventItem.capacity > 0" class="text-end m-0"><span class="primary-text">{{eventItem.capacity}}</span> spots left</p>
        <div v-else class="bg-danger text-dark w-100 d-flex justify-content-center p-1 rounded-2">
          <p class="m-0">At Capacity</p>
        </div>
      </div>
    </div>
  </router-link>
<!-- </router-link> -->
</template>


<script>
import { Event } from '../models/Event.js';
export default {
  props: {
    eventItem: {type: Event, required: true}
  },
  setup(){
    return {
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

.h-spec {
  height: 100%;
}

.bottom-5 {
  bottom: 5%;
}

.primary-text {
  color: #56C7FB;
}

.bg-danger {
  background-color: #FF5977 !important;
}
</style>