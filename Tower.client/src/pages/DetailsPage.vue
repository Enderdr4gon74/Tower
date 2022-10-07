<template>
  <div class="row px-1">
    <div class="col-3 pt-3 pb-1">
      <img src="../assets/img/Logo.png" alt="Tower" class="img-fluid">
    </div>
  </div>
  <div class="row p-3 justify-content-center" v-if="ActiveEvent">
    <!-- event full card -->
    <div class="col-12">
      <div class="card bg-light-dark p-3 row d-flex">
        <div class="col-12 px-2">
          <div class="row">
            <div v-if="ActiveEvent.creatorId == User.id && !ActiveEvent.isCanceled" class="col-12 d-flex justify-content-end">
              <button @click="deleteEvent(ActiveEvent.id)" class="btn text-success lighten-30 selectable text-uppercase fs-4 py-0 px-2"  title="Delete Event"><i class="mdi mdi-delete-forever m-0"></i></button>
            </div>
            <div class="col-4">
              <img :src="ActiveEvent.coverImg" :alt="ActiveEvent.name" class="img-fluid">
            </div>
            <div class="col-8 d-flex flex-column justify-content-between">
              <div class="row">
                <div class="col-12 d-flex justify-content-between">
                  <h4>{{ActiveEvent.name}}</h4>
                  <h4 class="info-text">{{ActiveEvent.startDateDate}}</h4>
                </div>
                <div class="col-12 d-flex justify-content-between">
                  <h4 class="info-text">{{ActiveEvent.location}}</h4>
                  <!-- <h4 class="info-text">Starting at {{ActiveEvent.startDateTimeOfDay}}</h4> -->
                </div>
                <div class="col-12">
                  <p>{{ActiveEvent.description}}</p>
                </div>
              </div>
              <div v-if="!ActiveEvent.isCanceled" class="row justify-content-between">
                <div class="col-7 p-2 d-flex justify-content-start align-items-end">
                  <div v-if="ActiveEvent.capacity > 0">
                    <h2 class="info-text m-0"><span class="primary-text">{{ActiveEvent.capacity}}</span> Spots left</h2>
                  </div>
                  <div v-else>
                    <h2 class="info-text m-0"><span class="danger-text">{{ActiveEvent.capacity}}</span> Spots left</h2>
                  </div>
                </div>
                <div v-if="User.isAuthenticated" class="col-4 p-2 d-flex justify-content-end align-items-end">
                  <div v-if="ActiveEvent.capacity > 0">
                    <div v-if="Tickets?.find(t => t.accountId == User.id)">
                      <button @click="deleteTicket()" class="btn btn-danger rounded"  title="Un-Attend Event">Un-Attend <i class="mdi mdi-human"></i></button>
                      <!-- {{Tickets.find(t => t.accountId == User.id).account.name}} -->
                    </div>
                    <div v-else>
                      <button @click="createTicket()" class="btn btn-warning rounded" title="Attend Event">Attend <i class="mdi mdi-human"></i></button>
                    </div>
                  </div>
                  <div v-else>
                    <div class="bg-danger rounded p-2">No spots left <i class="mdi mdi-human"></i></div>
                  </div>
                </div> 
              </div>
              <div v-else class="row">
                <div class="col-12">
                  <div class="bg-danger p-3 rounded-2 w-100 d-flex justify-content-center">
                    Event Cancelled
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Ticket Holders -->
    <div class="col-12 mt-3">
      <h4 class="p-2 text-light mx-2">See who is attending</h4>
      <div class="card bg-light-dark py-3 px-2 mx-3 row flex-row">
        <TicketHolder v-for="t in Tickets" :ticket="t" />
      </div>
    </div>
    <!-- Comments here -->
    <div class="col-10 mt-3">
      <h4 class="p-2 text-light mx-2">What are people saying</h4>
      <div class="card bg-light-dark p-4 mx-3 row flex-row justify-content-center">
        <!-- Comment form -->
        <div class="col-12" v-if="User.isAuthenticated">
          <form @submit="handleSubmit()">
            <div class="form-floating mb-3">
              <textarea class="form-control" placeholder="Body" id="body" v-model="editable.body" required></textarea>
              <label class="text-dark" for="body">Make A Comment</label>
            </div>
            <div class="d-flex justify-content-end">
              <button class="btn btn-success px-4 py-2" type="submit"  title="Create Comment">Create</button>
            </div>
          </form>
        </div>
        <!-- Comments shown here -->
        <div class="col-12 mt-4">
          <div class="row justify-content-center gap-4">
            <!-- TODO show comments here -->
            <Comment v-for="c in Comments" :Comment="c" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-center align-items-center" v-else>
    <img src="https://media1.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif?cid=6c09b952um0m52mj4i3ec61o3vz9jy1wu7vcresa4fjvnyeu&rid=giphy.gif&ct=s" alt="loading..." class="img-fluid w-spec rounded">
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import { commentsService } from '../services/CommentsService.js';
import Pop from '../utils/Pop.js';
import TicketHolder from '../components/TicketHolder.vue';
import { ticketsService } from '../services/TicketsService.js';
import { ref } from 'vue'
import Comment from '../components/Comment.vue';

export default {
  setup() {
    const editable = ref({})
    const route = useRoute();
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.id);
      }
      catch (error) {
        Pop.error(error, "[Getting Event]");
      }
    }
    async function getTicketsByEventId() {
      try {
        AppState.eventId = route.params.id
        await ticketsService.getTicketsByEventId(route.params.id);
      }
      catch (error) {
        Pop.error(error, "[Getting Tickets]");
      }
    }
    async function getCommentsByEventId() {
      try {
        AppState.eventId = route.params.id
        await commentsService.getCommentsByEventId(route.params.id);
      }
      catch (error) {
        Pop.error(error, "[Getting Comments]");
      }
    }
    onMounted(() => {
      getTicketsByEventId();
      getEventById();
      getCommentsByEventId()
    });
    return {
      editable,
      async handleSubmit() {
        try {
          // TODO Create Comment service and call create comment here
          await commentsService.createComment(editable.value, route.params.id)
        } catch (error) {
          Pop.error(error, "[Handling Submit]")
        }
      },
      ActiveEvent: computed(() => AppState.ActiveEvent),
      User: computed(() => AppState.user),
      Account: computed(() => AppState.account),
      Tickets: computed(() => AppState.Tickets),
      Comments: computed(() => AppState.Comments),
      async createTicket() {
        try {
          await ticketsService.createTicket(route.params.id)
          Pop.success("You have joined this event!")
        } catch (error) {
          Pop.error
        }
      },
      async deleteTicket() {
        try {
          // Pop.toast("ticket")
          const ticketIndex = AppState.Tickets.findIndex(t => t.accountId == AppState.user.id && t.eventId == AppState.ActiveEvent.id)
          // Pop.toast(AppState.Tickets[ticketIndex].id)
          await ticketsService.deleteTicket(AppState.Tickets[ticketIndex].id, ticketIndex)
          Pop.success("You have left this event!")
        } catch (error) {
          Pop.error
        }
      },
      async deleteEvent(eventId) {
        try {
          await eventsService.deleteEvent(eventId)
          Pop.success("You have left this event!")
        } catch (error) {
          Pop.error
        }
      },
    };
  },
  components: { TicketHolder, Comment }
}
</script>


<style lang="scss" scoped>
.bg-light-dark {
  background-color: #1f2b41;
}

.info-text {
  color: #CCF3FD;
}

.primary-text {
  color: #56C7FB;
}

.danger-text {
  color: #FF5977;
}
</style>