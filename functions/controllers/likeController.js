// Import like model
const models = require('../models')
User = models.User
Post = models.Post
Like = models.Like

// Handle index actions
exports.index = async (req, res) => {
  try {
    const like = await Like.find({})
    res.status(200).json({
      success: true,
      data: like
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Handle create like actions
exports.new = async (req, res) => {
  try {
    const like = new Like(req.body)
    await like.save()

    const user = await User.findById({_id: like.user_id})
    user.like_ids.push(like);
    await user.save()

    const post = await Post.findById({_id: like.post_id})
    post.like_ids.push(like)
    await post.save()

    res.status(201).json({
      success: true,
      data: like
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Handle view like info
exports.view = async (req, res) => {
  try {
    const like = await Like.findById(req.params.like_id)
    res.status(200).json({
      success: true,
      data: like
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Handle update like info
exports.update = async (req, res) => {
  try {
    const like = await Like.findById(req.params.like_id)
    like.user_id = req.body.user_id
    like.save()
    res.status(201).json({
      success: true,
      data: like
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Handle delete like
exports.delete = async (req, res) => {
  try {
    const like = await Like.findById(req.params.like_id)
    like.remove(req.params.like_id)
    res.status(201).json({
      success: true,
      message: "like deleted"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}