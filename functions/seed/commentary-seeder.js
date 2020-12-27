const mongoose = require('mongoose')
const faker = require('faker')

Post = require('../models/postModel')
User = require('../models/userModel')
Commentary = require('../models/commentaryModel')

// Connect to Mongoose and set connection variable
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/insta_app", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let seedCommentary = async () => {
  try {
    let get_all_user = await User.find({})
    let get_all_post = await Post.find({})
    for (let i = 0; i < 10; i++) {
      let commentary =
        new Commentary({
          text_commentary: faker.lorem.sentences(),
          user_id: get_all_user[getRandomInt(get_all_user.length)].id,
          post_id: get_all_post[getRandomInt(get_all_post.length)].id,
        })
      await commentary.save()

      // Insert commentary_id to collection user
      const user = await User.findById({
        _id: commentary.user_id
      })
      user.commentary_ids.push(commentary);
      await user.save()

      // Insert commentary_id to collection post
      const post = await Post.findById({
        _id: commentary.post_id
      })
      post.commentary_ids.push(commentary)
      await post.save()
    }
    await mongoose.disconnect()
  } catch (error) {
    console.log(error)
  }
}
seedCommentary()

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}