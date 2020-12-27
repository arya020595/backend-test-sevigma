const mongoose = require('mongoose')
const faker = require('faker')

Post = require('../models/postModel')
User = require('../models/userModel')
Like = require('../models/likeModel')

// Connect to Mongoose and set connection variable
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/insta_app", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let seedLike = async () => {
  try {
    let get_all_user = await User.find({})
    let get_all_post = await Post.find({})
    for (let i = 0; i < 10; i++) {
      let like =
        new Like({
          user_id: get_all_user[getRandomInt(get_all_user.length)].id,
          post_id: get_all_post[getRandomInt(get_all_post.length)].id,
        })
      await like.save()

      // Insert like_id to collection user
      const user = await User.findById({
        _id: like.user_id
      })
      user.like_ids.push(like);
      await user.save()

      // Insert like_id to collection post
      const post = await Post.findById({
        _id: like.post_id
      })
      post.like_ids.push(like)
      await post.save()
    }
    await mongoose.disconnect()
  } catch (error) {
    console.log(error)
  }
}
seedLike()

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}