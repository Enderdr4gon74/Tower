import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class TicketsService {
  async getTicketsByEventId(eventId){
    const res = await api.get(`api/events/${eventId}/tickets`)
    console.log(res.data.map(t => new Ticket(t)))
    AppState.Tickets = res.data.map(t => new Ticket(t))
  }

  async createTicket(eventId) {
    const ticketData = {eventId}
    const res = await api.post('/api/tickets', ticketData)
    // console.log(new Ticket(res.data))
    const newTicket = new Ticket(res.data)
    setTimeout(AppState.Tickets.push(newTicket), 1000)
    AppState.ActiveEvent.capacity -= 1
  }

  async deleteTicket(ticketId, ticketIndex) {
    // Pop.toast("service runs")
    await api.delete(`/api/tickets/${ticketId}`)
    AppState.Tickets.splice(ticketIndex, 1)
    AppState.ActiveEvent.capacity += 1
  }

  async getTicketsByAccountId() {
    // console.log("it works")
    const res = await api.get(`/account/tickets`)
    console.log(res.data.map(t => new Ticket(t)))
    AppState.Tickets = res.data.map(t => new Ticket(t)).reverse()
  }
}

export const ticketsService = new TicketsService()