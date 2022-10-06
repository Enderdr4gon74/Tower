<template>
  <div class="row p-3" v-if="ActiveEvent">
    <div class="col-12">
      <div class="card bg-light-dark p-3 row d-flex">
        <div class="col-12 px-2">
          <div class="row">
            <div class="col-12 d-flex justify-content-end">
              <button class="btn text-success lighten-30 selectable text-uppercase fs-4 py-0 px-2"><i class="mdi mdi-dots-horizontal m-0"></i></button>
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
                  <h4 class="info-text">Starting at {{ActiveEvent.startDateTimeOfDay}}</h4>
                </div>
                <div class="col-12">
                  <p>{{ActiveEvent.description}}</p>
                </div>
              </div>
              <div class="row justify-content-between">
                <div class="col-4 p-1 d-flex justify-content-start align-items-end">
                  <div v-if="ActiveEvent.capacity > 0">
                    <h2 class="info-text m-0"><span class="primary-text">{{ActiveEvent.capacity}}</span> Spots left</h2>
                  </div>
                  <div v-else>
                    <h2 class="info-text m-0"><span class="danger-text">{{ActiveEvent.capacity}}</span> Spots left</h2>
                  </div>
                </div>
                <div class="col-3 p-1 d-flex justify-content-end align-items-end">
                  <div v-if="ActiveEvent.capacity > 0">
                    <button class="btn btn-warning rounded">Attend <i class="mdi mdi-human"></i></button>
                  </div>
                  <div v-else>
                    <button class="btn btn-danger rounded">No spots left <i class="mdi mdi-human"></i></button>
                  </div>
                </div> 
              </div>
            </div>
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
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const route = useRoute();
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.id)
      } catch (error) {
        Pop.error(error, "[Getting Event]")
      }
    }
    onMounted(()=> {
      getEventById()
    })
    return {
      ActiveEvent: computed(()=> AppState.ActiveEvent)
    }
  }
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