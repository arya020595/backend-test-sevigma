let mongoose = require('mongoose')
// Connect to Mongoose and set connection variable
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/insta_app", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, async () =>{
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
})