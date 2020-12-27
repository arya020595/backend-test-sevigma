const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Setup schema
const postSchema = Schema({
  text_post: {
    type: String,
    required: true
  },
  image_post: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  commentary_ids: [{
    type: Schema.Types.ObjectId,
    ref: "commentary"
  }],
  like_ids: [{
    type: Schema.Types.ObjectId,
    ref: "like"
  }]
}, {
  timestamps: true
})

postSchema.pre('save', async (next) => {
  this.updated_at = Date.now()
})

// Export Post model
module.exports = mongoose.model('post', postSchema)
module.exports.get = (callback, limit) => {
  Post.find(callback).limit(limit)
}