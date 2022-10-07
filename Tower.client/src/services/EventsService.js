import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { router } from "../router.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"
import { ticketsService } from "./TicketsService.js"

class EventsService {

  async getEvents(type = '') {
    let res = await api.get('/api/events')
    if (AppState.type) {
      AppState.events = res.data.map(e => new Event(e)).filter(event => event.type == AppState.type).reverse()
      console.log("filtered by " + AppState.type)
    } else {
      console.log("not filtered")
      AppState.events = res.data.map(e => new Event(e)).reverse()
    }
    console.log(AppState.events)
  }

  async getEventById(eventId){
    let res = await api.get(`/api/events/${eventId}`)
    // console.log(res.data)
    AppState.ActiveEvent = new Event(res.data)
  }

  async changeFilter(filter) {
    if (filter == '') {
      AppState.events = null
      AppState.type = null
    } else if (filter == "concert" || filter == "convention" || filter == "sport" || filter == "digital") {
      AppState.events = null
      AppState.type = filter
    } else {
      throw new Error("not valid filter")
    }
  }

  async createEvent(eventData) {
    const event = await api.post('/api/events', eventData)
    const newEvent = new Event(event.data)
    AppState.events.unshift(newEvent)
    await router.push({ name: 'Details', params: {id: newEvent.id}});
    location.reload()
    await ticketsService.createTicket(event.data.id)
  }

  async getEventsByCreatorId(creatorId) {
    // console.log(creatorId)
    let res = await api.get('/api/events')
    console.log(res.data.map(e => new Event(e)).filter(e => e.creator.id == creatorId))
    let events = res.data.map(e => new Event(e)).filter(e => e.creator.id == creatorId).reverse()
    AppState.events = events
  }

  async deleteEvent(eventId) {
    await router.push({ name: 'Home'});
    await api.delete(`/api/events/${eventId}`)
    location.reload()
  }
}

export const eventsService = new EventsService()