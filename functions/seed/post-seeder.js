const mongoose = require('mongoose')
const faker = require('faker')
Post = require('../models/postModel')
User = require('../models/userModel')

// Connect to Mongoose and set connection variable
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/insta_app", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let seedPost = async () => {
  try {
    let get_all_user = await User.find({})
    for (let i = 0; i < 100; i++) {
      let random_index_user = getRandomInt(get_all_user.length)
      let post =
        new Post({
          text_post: faker.lorem.sentences(),
          image_post: faker.image.imageUrl(),
          user_id: get_all_user[random_index_user].id,
        })
      await post.save()

      // Insert post_id to collection user
      const user = await User.findById({
        _id: post.user_id
      })
      user.post_ids.push(post);
      await user.save()
    }
    await mongoose.disconnect()
  } catch(error){
    console.log(error) 
  }
  
}
seedPost()

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}