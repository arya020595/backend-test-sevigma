const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Setup schema
const likeSchema = Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  post_id: {
    type: Schema.Types.ObjectId,
    ref: "post",
    required: true
  }
}, {
  timestamps: true
})

likeSchema.pre('save', (next) => {
  this.updated_at = Date.now()
  next()
})

// Export Like model
module.exports = mongoose.model('like', likeSchema)
module.exports.get = (callback, limit) => {
  Like.find(callback).limit(limit)
}