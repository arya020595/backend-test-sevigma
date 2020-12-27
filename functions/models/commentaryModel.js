const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Setup schema
const commentarySchema = Schema({
  text_commentary: {
    type: String,
    required: true
  },
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

commentarySchema.pre('save', (next) => {
  this.updated_at = Date.now()
  next()
})

// Export Commentary model
module.exports = mongoose.model('commentary', commentarySchema)
module.exports.get = (callback, limit) => {
  Commentary.find(callback).limit(limit)
}