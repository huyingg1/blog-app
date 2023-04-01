const router = require("express").Router();
const { Article, User, Comment } = require("../models");
// Import the custom middleware
const withAuth = require("../utils/auth");

// GET all articles for homepage
router.get("/", async (req, res) => {
  try {
    const dbArticleData = await Article.findAll({
      order: [["post_date", "DESC"]],
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["username"],
        },
      ],
    });

    const articles = dbArticleData.map((article) =>
      article.get({ plain: true })
    );

    res.render("homepage", {
      articles,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/article/:id", withAuth, async (req, res) => {
  try {
    const articleData = await Article.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["username"],
          },
          order: [["comment_date", "DESC"]],
        },
        {
          model: User,
          as: "creator",
          attributes: ["username", "id"],
        },
      ],
    });

    if (!articleData) {
      res.status(404).json({ message: "No article found with this id!" });
      return;
    }

    const article = articleData.get({ plain: true });

    const isCreator = req.session.user_id === article.creator.id;

    res.render("article", {
      ...article,
      loggedIn: req.session.loggedIn,
      isCreator,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a new route for rendering the "New Article" form
router.get("/new-article", withAuth, (req, res) => {
  res.render("new-article");
});

// Add a new route for handling the form submission
router.post("/new-article", withAuth, async (req, res) => {
  try {
    const newArticle = await Article.create({
      title: req.body.title,
      content: req.body.content,
      post_date: new Date(),
      creator_id: req.session.user_id,
    });
    res.status(200).json(newArticle);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;

    const dbArticleData = await Article.findAll({
      where: {
        creator_id: userId,
      },
      order: [["post_date", "DESC"]],
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["username"],
        },
      ],
    });

    const articles = dbArticleData.map((article) =>
      article.get({ plain: true })
    );

    res.render("dashboard", { articles, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/edit-article/:id", withAuth, async (req, res) => {
  try {
    const dbArticleData = await Article.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["username"],
        },
      ],
    });

    if (!dbArticleData) {
      res.status(404).json({ message: "No article found with this id" });
      return;
    }

    const articleData = dbArticleData.get({ plain: true });

    if (articleData.creator_id !== req.session.user_id) {
      res
        .status(403)
        .json({ message: "You are not authorized to edit this article" });
      return;
    }

    res.render("edit-article", {
      article: articleData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/edit-article/:id", withAuth, async (req, res) => {
  try {
    const articleId = req.params.id;
    const { title, content } = req.body;

    const article = await Article.findByPk(articleId);

    if (!article) {
      res.status(404).json({ message: "No article found with this id" });
      return;
    }

    if (article.creator_id !== req.session.user_id) {
      res
        .status(403)
        .json({ message: "You are not authorized to edit this article" });
      return;
    }

    await Article.update(
      {
        title,
        content,
        post_date: new Date(),
      },
      {
        where: {
          id: articleId,
        },
      }
    );

    res.status(200).json({ message: "Article updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
