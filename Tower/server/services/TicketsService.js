import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class TicketsService {
  async refundTicket(ticketId, accountId) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    if (!ticket) {
      throw new BadRequest("invalid or bad Ticket id")
    }
    if (ticket.accountId != accountId) {
      throw new Forbidden("Not you Ticket, bucko!")
    }
    const event = await eventsService.getEventById(ticket.eventId)
    ticket.remove()
    event.capacity++
    event.save()
  }
  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({eventId}).populate('event').populate('profile', 'name picture')
    return tickets
  }
  async getMyTickets(userId) {
    const tickets = await dbContext.Tickets.find({accountId: userId}).populate('event')
    return tickets
  }
  async purchaseTicket(ticketData) {
    const event = await eventsService.getEventById(ticketData.eventId)
    if (event.capacity == 0){
      throw new BadRequest("sold out no more tickets available!")
    }
    event.capacity--
    await event.save()
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile', 'name picture')
    await ticket.populate('event')
    return ticket
  }

}

export const ticketsService = new TicketsService()