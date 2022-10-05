import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { api } from "./AxiosService.js"

class EventsService {

  async getEvents(type = '') {
    let res 
    if (type) {
      res = await api.get('api/events', {
        params: {
          type
        }
      })
    } else {
      res = await api.get('/api/events')
    }
    console.log(res.data.map(e => new Event(e)))
    AppState.events = res.data.map(e => new Event(e))
  }

}

export const eventsService = new EventsService()