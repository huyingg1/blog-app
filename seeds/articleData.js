const { Article } = require("../models");

const articledata = [
  {
    title: "abc",
    content:
      "Writing about tech can be just as important as making it. Developers spend plenty of time creating new applications and debugging existing codebases, but most developers also spend at least some of their time reading and writing about technical concepts, recent advancements, and new technologies. A simple Google search for any concept covered in this course returns thousands of think pieces and tutorials from developers of all skill levels!",
    post_date: "April 20, 2021 07:00:00",
    creator_id: 1,
  },
  {
    title: "Sommer",
    content:
      "Your challenge this week is to build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers posts as well. Youll build this site completely from scratch and deploy it to Heroku. Your app will follow the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.",
    post_date: "June 22, 2021 09:00:00",
    creator_id: 2,
  },
  {
    title: "Herfst",
    content:
      "Content testing testing testing testing testing testing testing testing Content testing testing testing testing testing testing testing testing Content testing testing testing testing testing testing testing testing Content testing testing testing testing testing testing testing testing",
    post_date: "September 23, 2021 08:30:00",
    creator_id: 1,
  },
];

const seedArticle = () => Article.bulkCreate(articledata);

module.exports = seedArticle;
