import mongoose, { Schema } from 'mongoose'

const messageSchema = new Schema({
  time: {
    type: Date,
    require: true
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  content: String
})

const Message = mongoose.model('Message', messageSchema)

export default Message
