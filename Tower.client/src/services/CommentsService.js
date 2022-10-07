import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async getCommentsByEventId(eventId) {
    let res = await api.get(`/api/events/${eventId}/comments`)
    console.log(res.data.map(c => new Comment(c)))
    AppState.Comments = res.data.map(c => new Comment(c))
  }

  async createComment(commentData, eventId) {
    commentData.eventId = eventId
    let res = await api.post(`api/comments`, commentData)
    console.log(new Comment(res.data))
    AppState.Comments.push(new Comment(res.data))
  }

  async deleteComment(commentId) {
    await api.delete(`api/comments/${commentId}`)
    const commentIndex = AppState.Comments.findIndex(c => c.id == commentId)
    AppState.Comments.splice(commentIndex, 1)
  }
}

export const commentsService = new CommentsService()