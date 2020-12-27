require('dotenv').config()

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const apiRoutes = require("./api-routes")

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())
mongoose.connect(functions.config().slack.mongodb_uri || "mongodb://localhost:27017/insta_app", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

if (!db)
  console.log("Error connecting db")
else
  console.log("Db connected successfully")

app.get('/', (req, res) => res.send('Hello World with Express'))

app.use('/api', apiRoutes)

exports.app = functions.https.onRequest(app);