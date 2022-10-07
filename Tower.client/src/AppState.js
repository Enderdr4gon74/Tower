import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/Event.js').Event[] | null} */
  events: null,

  /** @type {import('./models/Event.js').Event | null} */
  ActiveEvent: null,
  
  /** @type {import('./models/Ticket.js').Ticket[] | null} */
  Tickets: null,

  /** @type {import('./models/Comment.js').Comment[] | null} */
  Comments: null,
  
  EventInfo: {},

  eventId: '',

  type: null
})
