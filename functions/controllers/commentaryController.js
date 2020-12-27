// Import commentary model
const models = require('../models')
User = models.User
Post = models.Post
Commentary = models.Commentary

// Handle index actions
exports.index = async (req, res) => {
  try {
    const commentary = await Commentary.find({})
    res.status(200).json({
      success: true,
      data: commentary
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Handle create commentary actions
exports.new = async (req, res) => {
  try {
    const commentary = new Commentary(req.body)
    await commentary.save()

    const user = await User.findById({_id: commentary.user_id})
    user.commentary_ids.push(commentary);
    await user.save()

    const post = await Post.findById({_id: commentary.post_id})
    post.commentary_ids.push(commentary)
    await post.save()

    res.status(201).json({
      success: true,
      data: commentary
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Handle view commentary info
exports.view = async (req, res) => {
  try {
    const commentary = await Commentary.findById(req.params.commentary_id)
    res.status(200).json({
      success: true,
      data: commentary
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Handle update commentary info
exports.update = async (req, res) => {
  try {
    const commentary = await Commentary.findById(req.params.commentary_id)
    commentary.text_post = req.body.text_post
    commentary.image_post = req.body.image_post
    commentary.user_id = req.body.user_id
    commentary.post_id = req.body.post_id
    commentary.save()
    res.status(201).json({
      success: true,
      data: commentary
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Handle delete commentary
exports.delete = async (req, res) => {
  try {
    const commentary = await Commentary.findById(req.params.commentary_id)
    commentary.remove(req.params.commentary_id)
    res.status(201).json({
      success: true,
      message: "commentary deleted"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}