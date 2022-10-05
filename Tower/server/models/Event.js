import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const EventSchema = new Schema({
  creatorId: {type: ObjectId, required: true},
  name: {type: String, required: true},
  description: {type: String, default: ''},
  coverImg: {type: String, required: true},
  location: {type: String, required: true},
  capacity: {type: Number, required: true},
  startDate: {type: Date, required: true},
  isCanceled: {type: Boolean, required: true},
  type: {type: String, required: true, enum: ['concert', 'convention', 'sport', 'digital']},
},
  { timestamps: true, toJSON: { virtuals: true } }
)

EventSchema.virtual('creator', {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account"
})

// creatorId: ObjectId
// name: string
// description: string
// coverImg: string
// location: string
// capacity: number
// startDate: Date
// isCanceled: boolean
// type: enum string
// ['concert' 'convention'
// 'sport', 'digital']
// **creator