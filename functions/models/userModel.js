const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

// Setup schema
const userSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: value => validator.isEmail(value)
  },
  fullname: {
    type: String,
    required: true,
  },
  post_ids: [{
    type: Schema.Types.ObjectId,
    ref: "post",
  }],
  commentary_ids: [{
    type: Schema.Types.ObjectId,
    ref: "commentary",
  }],
  like_ids: [{
    type: Schema.Types.ObjectId,
    ref: "like",
  }]
}, {
  timestamps: true
})

userSchema.pre('save', async function(next) {
  this.updated_at = Date.now()
})

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return 
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
  } catch (err) {
    return err
  }
})

userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password)
}

userSchema.pre('remove', async function (next) {
  try {
    await Post.deleteMany({user_id: this._id})
    await Commentary.deleteMany({user_id: this._id})
    await Like.deleteMany({user_id: this._id})
  } catch(error) {
    console.log(error)
  }
})

module.exports = mongoose.model('user', userSchema)
module.exports.get = (callback, limit) => {
  User.find(callback).limit(limit)
}