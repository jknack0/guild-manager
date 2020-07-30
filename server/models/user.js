const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  raiderIo: Object,
  guild: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guild'
  }
})

userSchema.plugin(uniqueValidator)
mongoose.set('useCreateIndex', true)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User