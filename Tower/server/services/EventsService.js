import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {
  async cancelEvent(eventId, userId) {
    const event = await this.getEventById(eventId)
    if (event.creatorId != userId) {
      throw new Forbidden("You can't delete what isn't yours")
    }
    if (event.isCanceled) {
      throw new BadRequest("You already cancelled this event...")
    }
    event.isCanceled = true
    const newEvent = await dbContext.Events.findByIdAndUpdate(eventId, event)
    return newEvent
  }
  async editEvent(eventData, eventId, userId) {
    const event = await this.getEventById(eventId)
    if (event.creatorId != userId) {
      throw new Forbidden("You can't edit what isn't yours")
    }
    if (event.isCanceled) {
      throw new BadRequest("That event has already been canceled, can't edit it now...")
    }
    const newEvent = await dbContext.Events.findByIdAndUpdate(eventId, eventData)
    return newEvent
  }
  async getEventById(id) {
    const event = await dbContext.Events.findById(id).populate('creator', 'name picture')
    if (!event) {
      throw new BadRequest("Invalid or Bad Event id")
    }
    return event
  }
  async getAllEvents() {
    const events = await dbContext.Events.find().populate('creator', 'name picture')
    return events
  }
  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate("creator", "name picture")
    // TODO add creator to going to list
    return event
  }

}

export const eventsService = new EventsService()