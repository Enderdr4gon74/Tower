export class Event {

  /**
   * @param {{id: String, creatorId: String, name: String, description?: String, coverImg: String, location: String, capacity: Number, startDate: String, isCanceled: Boolean, type: String, creator: Object}} data 
   */
  constructor(data) {
    let startDate = new Date(data.startDate)
    let minutes = startDate.getUTCMinutes().toString()
    if (minutes.length == 1) { minutes = "0" + minutes } 
    let hoursNumber = startDate.getUTCHours()
    let amPm = "Am"
    if (hoursNumber.length > 12) { hoursNumber -= 12; amPm = "Pm" }
    let hoursString = hoursNumber.toString()
    if (hoursString.length == 1) { hoursString = "0" + hoursString } 
    this.id = data.id
    this.creatorId = data.creatorId
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDateFull = startDate.getUTCMonth() + "/" + startDate.getUTCDay() + "/" + startDate.getUTCFullYear() + " @ " + hoursString + ":" + minutes + " " + amPm
    this.startDateDate = startDate.getUTCMonth() + "/" + startDate.getUTCDay() + "/" + startDate.getUTCFullYear()
    this.startDateTimeOfDay = hoursString + ":" + minutes + " " + amPm
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.creator = data.creator
  }
}