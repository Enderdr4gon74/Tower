import {Account} from '../models/Account.js'
import {Event} from '../models/Event.js'

export class Ticket {

  /**
   * @param {{id: String, eventId: String, accountId: String, profile: Account, event: Event}} data 
   */
  constructor(data) {
    this.id = data.id
    this.eventId = data.eventId
    this.accountId = data.accountId
    this.event = data.event
    this.account = data.profile
  }
}