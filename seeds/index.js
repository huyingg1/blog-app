const sequelize = require("../config/connection");
const seedUser = require("./userData");
const seedArticle = require("./articleData");
const seedComment = require("./commentData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedArticle();

  await seedComment();

  process.exit(0);
};

seedAll();
