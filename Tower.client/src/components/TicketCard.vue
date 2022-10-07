<template>
  <div class="col-8 p-1">
    <div class="row ">
      <div class="col-5 p-0">
        <router-link :to="{name: 'Details', params: {id: TicketItem.eventId}}" title="To Event Details">
          <img :src="TicketItem.event.coverImg" :alt="TicketItem.event.name" class="img-fluid w-100 rounded-start selectable">
        </router-link>
      </div>
      <div class="col-6 bg-grey d-flex flex-column justify-content-between">
        <div class=" text-light">
          <h4 class="mb-1">{{TicketItem.event.name}}</h4>
          <p class="m-0">{{TicketItem.event.location}}</p>
          <p class="m-0">{{TicketItem.event.startDateDate}}</p>
        </div>
        <div class="d-flex justify-content-end py-2">
          <button @click="deleteTicket(TicketItem.id, TicketItem.eventId)" class="btn btn-danger rounded" title="Not Going">Not Going</button>
        </div>
      </div>
      <div class="col-1 p-0">
        <img src="../assets/img/TicketEnd.png" alt="ticketEnd" class="img-fluid w-100 h-100 rounded-end">
      </div>
    </div>
  </div>  
</template>


<script>
import { AppState } from '../AppState.js';
import { Ticket } from '../models/Ticket.js';
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    TicketItem: {type: Ticket, required: true}
  },
  setup(){
    return {
      async deleteTicket(ticketId, eventId) {
        try {
          // Pop.toast("ticket")
          const ticketIndex = AppState.Tickets.findIndex(t => t.accountId == AppState.user.id || t.eventId == eventId)
          // Pop.toast(AppState.Tickets[ticketIndex].id)
          await ticketsService.deleteTicket(ticketId, ticketIndex)
          Pop.success("You have left this event!")
        } catch (error) {
          Pop.error
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.bg-grey {
  background-color: #474C61 !important;
}
</style>