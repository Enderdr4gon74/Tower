import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class EventsService {

  async getEvents(type = '') {
    let res = await api.get('/api/events')
    if (AppState.type) {
      AppState.events = res.data.map(e => new Event(e)).filter(event => event.type == AppState.type)
      console.log("filtered by " + AppState.type)
    } else {
      console.log("not filtered")
      AppState.events = res.data.map(e => new Event(e))
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
      AppState.type = null
    } else if (filter == "concert" || filter == "convention" || filter == "sport" || filter == "digital") {
      AppState.type = filter
    } else {
      throw new Error("not valid filter")
    }
  }
}

export const eventsService = new EventsService()