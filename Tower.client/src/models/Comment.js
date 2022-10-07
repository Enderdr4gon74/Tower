import { Account } from "./Account.js"

export class Comment {
  /**
   * @param {{id:String, creatorId: String, eventId: String, body: String, isAttending: Boolean, creator: Account}} data 
   */
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.eventId = data.eventId
    this.body = data.body
    this.isAttending = data.isAttending
    this.creator = data.creator
  }
}