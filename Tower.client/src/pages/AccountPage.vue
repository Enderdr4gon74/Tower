<template>
  <!-- my events -->
  <div class="row justify-content-center">
    <div class="col-12 p-3 px-4">
      <h3>My Events</h3>
    </div>
    <div v-if="events" class="col-11">
      <div v-if="events?.length > 0" class="row px-3 py-2 bg-light-dark rounded-2">
        <EventCard v-for="e in events" :eventItem="e" />
      </div>
      <div v-else class="row px-3 py-2 bg-light-dark rounded-2 justify-content-center">
        <div class="col-4 d-flex justify-content-center">
          <img src="https://media1.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif?cid=6c09b952um0m52mj4i3ec61o3vz9jy1wu7vcresa4fjvnyeu&rid=giphy.gif&ct=s" alt="loading..." class="img-fluid">
        </div>
      </div>
    </div>
  </div>
  <!-- my tickets -->
  <div class="row my-4 justify-content-center">
    <div class="col-12 p-3 px-4">
      <h3>My Tickets</h3>
    </div>
    <div class="col-11" v-if="tickets">
      <div v-if="tickets?.length > 0" class="row p-3 gap-3 bg-light-dark rounded-2 justify-content-center">
        <TicketCard v-for="t in tickets" :TicketItem="t" />
      </div>
      <div v-else class="row p-3 gap-3 bg-light-dark rounded-2 justify-content-center">
        <img src="https://media1.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif?cid=6c09b952um0m52mj4i3ec61o3vz9jy1wu7vcresa4fjvnyeu&rid=giphy.gif&ct=s" alt="loading..." class="img-fluid">
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { eventsService } from '../services/EventsService.js';
import EventCard from '../components/EventCard.vue';
import Pop from '../utils/Pop.js';
import { ticketsService } from '../services/TicketsService.js';
import TicketCard from '../components/TicketCard.vue';
export default {
  setup() {
    async function getEventsByCreatorId() {
      try {
        await eventsService.getEventsByCreatorId(AppState.account?.id);
      }
      catch (error) {
        Pop.error(error, "[Getting Events]");
      }
    }
    async function getTicketsByAccountId() {
      try {
        await ticketsService.getTicketsByAccountId()
      } catch (error) {
        Pop.error(error, "[Getting Tickets]")
      }
    }
    onMounted(()=>{
      getTicketsByAccountId()
      setTimeout(getEventsByCreatorId, 500)
    })
    return {
      account: computed(() => AppState.account),
      events: computed(()=> AppState.events),
      tickets: computed(()=> AppState.Tickets),
    };
  },
  components: { EventCard, TicketCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.bg-light-dark {
  background-color: #1f2b41;
}
</style>
