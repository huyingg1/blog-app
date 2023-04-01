const { Comment } = require("../models");

const commentData = [
  {
    content: "This is a great article!",
    comment_date: "April 8, 2021 05:00:00",
    user_id: 1,
    article_id: 1,
  },
  {
    content: "I totally agree with you.",
    comment_date: "May 10, 2021 07:20:00",
    user_id: 2,
    article_id: 1,
  },
  {
    content: "Thanks for sharing your thoughts.",
    comment_date: "April 21, 2022 07:30:00",
    user_id: 1,
    article_id: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
