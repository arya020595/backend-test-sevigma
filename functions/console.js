let repl = require('repl')
let models = require('./models')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/insta_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

Object.keys(models).forEach(modelName => {
  global[modelName] = models[modelName]
})

global['DateTime'] = Date.now()

let replServer = repl.start({
  prompt: 'app > '
})

replServer.context.db = models;