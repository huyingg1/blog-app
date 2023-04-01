const { User } = require("../models");
const bcrypt = require("bcrypt");

const userdata = [
  {
    username: "qqqqqq",
    email: "qqqqqq@mail.com",
    password: bcrypt.hashSync("111111", 10),
  },
  {
    username: "oooooo",
    email: "oooooo@mail.com",
    password: bcrypt.hashSync("222222", 10),
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
