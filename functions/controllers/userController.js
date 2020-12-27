// Import user model
const models = require('../models')
User = models.User
Post = models.Post
Like = models.Like
Commentary = models.Commentary
const bcrypt = require("bcrypt");

// Handle index actions
exports.index = async (req, res) => {
  try {
    const user = await User.find({})
    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Handle create user actions
exports.new = async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()

    res.status(201).json({
      success: true,
      data: user,
      message: "User has been created"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Handle view user info
exports.view = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id)
    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Handle update user info
exports.update = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id)
    user.username = req.body.username ? req.body.username : user.username
    user.password = req.body.password
    user.email = req.body.email
    user.fullname = req.body.fullname
    user.save()
    res.status(201).json({
      success: true,
      data: user,
      message: "User has been updated"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Handle delete user
exports.delete = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id)
    user.remove(req.params.post_id)
    res.status(201).json({
      success: true,
      message: "User has been deleted"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Verification login
exports.login = async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findOne({username: req.body.username})
    if(!user) {
      res.status(400).send({message: "The username does not exist" });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if(!match) {
      res.status(400).send({message: "The password is invalid" });
    }
    res.status(200).send({ message: "The username and password combination is correct!" });
    } catch (error) {
      res.status(500).send(error.message);
  }
}