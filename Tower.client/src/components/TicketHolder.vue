<template>
  <div class="col-1">
    <img :src="ticket?.account.picture" :alt="ticket?.account.name" class="rounded-circle user-image mx-1" :title="ticket?.account.name">
  </div>
</template>


<script>
import { Ticket } from "../models/Ticket.js"

export default {
  props: {
    ticket: {type: Ticket, required: true}
  },
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>
.user-image {
  width: 100% !important;
  padding: 0;
}

.col-1 {
  width: 5% !important;
  padding: 2px !important;
}
</style>