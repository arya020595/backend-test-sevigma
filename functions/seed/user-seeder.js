const mongoose = require('mongoose');
const faker = require('faker')
const TOTAL_USER = 10
User = require('../models/userModel')

// Connect to Mongoose and set connection variable
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/insta_app", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let user = async () => {
  let users = []
    for (let i = 0; i < TOTAL_USER; i++) {
      let user = new User({
        username: faker.internet.userName(),
        password: "bismillah",
        email: faker.internet.email(),
        fullname: faker.name.findName(),
      })
      users.push(user)
    }
  await User.create(users)
  mongoose.disconnect()
}

user()