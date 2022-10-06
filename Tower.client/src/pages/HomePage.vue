<template>
  <div class="row py-3 px-4">
    <div class="col-3 px-0 mb-3">
      <img src="../assets/img/Logo.png" alt="Tower" class="img-fluid">
    </div>
    <div class="col-12 bg-special rounded-3 d-flex flex-column justify-content-center gap-1 ps-4_5 fs-5">
      <p class="m-0">Get ahead of the scalpers.</p>
      <p class="m-0">Reserve you seat now with</p>
      <p class="m-0">real events for real people.</p>
    </div>
    <div class="col-12 p-2 bg-light-dark my-3 rounded-3 d-flex justify-content-between">
      <!-- <h4 class="m-0">filters here</h4> -->
      <button @click="changeFilter('')" class="btn bg-success lighten-30 selectable text-uppercase">All</button>
      <button @click="changeFilter('concert')" class="btn bg-success lighten-30 selectable text-uppercase">Concert</button>
      <button @click="changeFilter('convention')" class="btn bg-success lighten-30 selectable text-uppercase">Convention</button>
      <button @click="changeFilter('sport')" class="btn bg-success lighten-30 selectable text-uppercase">Sport</button>
      <button @click="changeFilter('digital')" class="btn bg-success lighten-30 selectable text-uppercase">Digital</button>
    </div>
    <div class="col-12">
      <div class="row p-3" v-if="events">
        <EventCard v-for="e in events" :eventItem="e" />
      </div>
      <div v-else class="d-flex justify-content-center align-items-center">
        <img src="https://media1.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif?cid=6c09b952um0m52mj4i3ec61o3vz9jy1wu7vcresa4fjvnyeu&rid=giphy.gif&ct=s" alt="loading...">
      </div>
    </div>
  </div> 
</template>

<script>
import { onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import EventCard from '../components/EventCard.vue';

export default {
    setup() {
      async function getEvents() {
        try {
          eventsService.getEvents();
        }
        catch (error) {
          Pop.error(error, "[Getting Events]");
        }
      }
      onMounted(() => {
          getEvents();
      });
      return {
        events: computed(()=> AppState.events),
        changeFilter(type) {
          try {
            eventsService.changeFilter(type)
            // Pop.toast(AppState.type)
            eventsService.getEvents()
          } catch (error) {
            Pop.error(error)
          }
        }
      };
    },
    components: { Event, EventCard }
}
</script>

<style scoped lang="scss">
.bg-special {
  background-image: url(../assets/img/unsplash_kcJsQ3PJrYU.png);
  background-size: cover;
  background-position: center center;
  min-height: 25vh;
  box-shadow: 0 0 0.35rem #cfcdcd;
}

.ps-4_5{
 padding-left: 2rem;
 color: #CCF3FD;
}

.bg-light-dark {
  background-color: #1f2b41;
}

.bg-success:hover {
  background-color: rgba(0,0,0,0) !important;
  color: #92ffbf !important;
}
</style>
