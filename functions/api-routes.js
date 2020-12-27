
const contactController = require('./controllers/contactController')
const postController = require('./controllers/postController')
const userController = require('./controllers/userController')
const commentaryController = require('./controllers/commentaryController')
const likeController = require('./controllers/likeController')

const router = require('express').Router()
const cors = require('cors')

router.use(cors())

router.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'API Its Working',
  })
})

router.route('/contacts')
  .get(contactController.index)
  .post(contactController.new)
router.route('/contacts/:contact_id')
  .get(contactController.view)
  .put(contactController.update)
  .delete(contactController.delete)

router.route('/post/:page')
  .get(postController.page)
router.route('/post/')
  .get(postController.index)
  .post(postController.new)
router.route('/post/:post_id')
  .get(postController.view)
  .put(postController.update)
  .delete(postController.delete)

router.route('/user')
  .get(userController.index)
  .post(userController.new)
router.route('/user/:user_id')
  .get(userController.view)
  .put(userController.update)
  .delete(userController.delete)
router.route('/user/login')
  .post(userController.login)

router.route('/commentary')
  .get(commentaryController.index)
  .post(commentaryController.new)
router.route('/commentary/:commentary_id')
  .get(commentaryController.view)
  .put(commentaryController.update)
  .delete(commentaryController.delete)

router.route('/like')
  .get(likeController.index)
  .post(likeController.new)
router.route('/like/:like_id')
  .get(likeController.view)
  .put(likeController.update)
  .delete(likeController.delete)

module.exports = router