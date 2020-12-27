// Import post model
const models = require('../models')
const PAGE_SIZE = 5
User = models.User
Post = models.Post

// Handle index actions
exports.index = async (req, res) => {
  try {
    const posts = await Post.find({})
    res.status(200).json({
      success: true,
      data: posts
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Handle index actions
exports.page = async (req, res) => {
  try {
    const skip = parseInt(req.params.page)
    const posts = await Post.find({}).skip(skip).limit(PAGE_SIZE)
    res.status(200).json({
      success: true,
      data: posts
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Handle create post actions
exports.new = async (req, res) => {
  try {
    const post = new Post(req.body)
    await post.save()

    const user = await User.findById({
      _id: post.user_id
    })
    user.post_ids.push(post);
    await user.save()

    res.status(201).json({
      success: true,
      data: post
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Handle view post info
exports.view = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id)
    res.status(200).json({
      success: true,
      data: post
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Handle update post info
exports.update = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id)
    post.text_post = req.body.text_post
    post.image_post = req.body.image_post
    post.user_id = req.body.user_id
    post.save()
    res.status(201).json({
      success: true,
      data: post
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Handle delete post
exports.delete = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id)
    post.remove(req.params.post_id)
    res.status(201).json({
      success: true,
      message: "post deleted"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}