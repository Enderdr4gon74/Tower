import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const CommentSchema = new Schema({
  creatorId: {type: ObjectId, required: true} ,
  eventId: {type: ObjectId, required: true},
  body: {type: String},
  isAttending: {type: Boolean, default: false}
},
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual("creator", {
  localField: "creatorId", // for whatever id it applies to in your schema
  foreignField: "_id", // this compares to the id of the referenced object
  justOne: true, // or false based on if you want just one or multiple objects
  ref: "Account" // for accounts change to what ever db context
})