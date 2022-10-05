import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const TicketSchema = new Schema({
  eventId: {type: ObjectId, required: true}, 
  accountId: {type: ObjectId, required: true},
},
  { timestamps: true, toJSON: { virtuals: true } }
)

TicketSchema.virtual("profile", {
  localField: "accountId", // for whatever id it applies to in your schema
  foreignField: "_id", // this compares to the id of the referenced object
  justOne: true, // or false based on if you want just one or multiple objects
  ref: "Account" // for accounts change to what ever db context
})

TicketSchema.virtual("event", {
  localField: "eventId", // for whatever id it applies to in your schema
  foreignField: "_id", // this compares to the id of the referenced object
  justOne: true, // or false based on if you want just one or multiple objects
  ref: "Event" // for accounts change to what ever db context
})

