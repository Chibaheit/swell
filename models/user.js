import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    index: true,
    unique: true
  },
  username: {
    type: String,
    index: true,
    unique: true
  },
  password: {
    type: String
  },
  avatar: String,
  friends: [],
  request: {},
  unread: {},
  lastSeen: {
    type: Date,
    default: Date.now()
  }
})

const User = mongoose.model('User', userSchema)

export default User
