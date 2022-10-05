import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class CommentsService {
  async removeComment(commentId, accountId) {
    const comment = await dbContext.Comments.findById(commentId).populate('creator')
    if (!comment) {
      throw new BadRequest("Invalid or Bad Comment Id")
    }
    if (comment.creatorId != accountId) {
      throw new Forbidden("Nacho comment my dear sir or madam")
    }
    comment.remove()
    return comment
  }
  getCommentsByEventId(eventId) {
    const comments = dbContext.Comments.find({eventId}).populate('creator', 'name picture')
    return comments
  }
  async postComment(commentData) {
    await eventsService.getEventById(commentData.eventId)
    const ticket = await dbContext.Tickets.findOne({eventId: commentData.eventId, accountId: commentData.creatorId})
    if (ticket) { commentData.isAttending = true } 
    else { commentData.isAttending = false }
    const comment = await (await dbContext.Comments.create(commentData))
    await comment.populate('creator', 'name picture')
    return comment
  }

}

export const commentsService = new CommentsService()