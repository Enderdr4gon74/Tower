<template>
  <form @submit.prevent="handleSubmit()" class="text-dark">
    <div class="form-floating mb-3">
      <select class="form-select" id="type" aria-label="type" required v-model="editable.type">
        <option selected value="concert">Concert</option>
        <option value="convention">Convention</option>
        <option value="sport">Sport</option>
        <option value="digital">Digital</option>
      </select>
      <label for="type">Type of Event</label>
    </div>
    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="name" placeholder="Event Name" v-model="editable.name" required>
      <label for="name">Event Name</label>
    </div>
    <div class="form-floating mb-3">
      <input type="url" class="form-control" id="coverImg" placeholder="Cover Image" v-model="editable.coverImg" required>
      <label for="coverImg">Cover Image</label>
    </div>
    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="location" placeholder="Location" v-model="editable.location" required>
      <label for="location">Location</label>
    </div>
    <div class="form-floating mb-3">
      <input type="number" class="form-control" id="capacity" placeholder="Capacity" v-model="editable.capacity" required min="1">
      <label for="capacity">Capacity</label>
    </div>
    <div class="form-floating mb-3">
      <input type="date" class="form-control" id="startDate" placeholder="Start Date" v-model="editable.startDate" required>
      <label for="startDate">Start Date</label>
    </div>
    <div class="form-floating mb-3">
      <textarea class="form-control" placeholder="Description" id="description" v-model="editable.description"></textarea>
      <label for="description">Description</label>
    </div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-success px-4 py-2" type="submit">Create</button>
    </div>
  </form>
</template>


<script>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { eventsService } from '../services/EventsService.js'
import Pop from '../utils/Pop.js'

export default {
  setup(){
    const route = useRoute()
    const editable = ref({})
    watchEffect(() => {
      editable.value = { ...AppState.EventInfo }
    })
    return {
      editable,
      async handleSubmit() {
        try {
          await eventsService.createEvent(editable.value)
        } catch (error) {
          Pop.error(error, "[Handling Submit]")
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>