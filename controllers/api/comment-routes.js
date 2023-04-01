const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//create new comment
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      article_id: req.body.article_id,
      user_id: req.session.user_id,
      comment_date: new Date(),
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
