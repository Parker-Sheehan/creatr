require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const { User } = require("../models/user");

const createToken = (email, id) => {
  const payload = { email, id };
  return jwt.sign(payload, SECRET);
};

module.exports = {
  signUp: async (req, res) => {
    try {
      let { name, email, password } = req.body;
      console.log(email);
      let foundUser = await User.findOne({ where: { email: email } });
      if (foundUser) {
        res.status(400).send("Account with email already exists");
      } else {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(password, salt);
        const newAccount = await User.create({ name, email, hashedPass: hash });
        console.log(newAccount);

        console.log(newAccount.dataValues.email);
        const token = createToken(
          newAccount.dataValues.email,
          newAccount.dataValues.id
        );
        console.log(token);
        const exp = Date.now() + 1000 * 60 * 60 * 48;
        let bodyObj = {
          email: newAccount.dataValues.email,
          userId: newAccount.dataValues.id,
          bio: newAccount.dataValues.bio,
          photo_added: newAccount.dataValues.photo_added,
          token: token,
          exp: exp,
        };
        res.status(200).send(bodyObj);
      }
    } catch (err) {
      console.log("error in reg");
      console.log(err);
      res.sendStatus(400);
    }
  },
  logIn: async (req, res) => {
    try {
      let { email, password } = req.body;
      let foundUser = await User.findOne({ where: { email: email } });
      if (foundUser) {
        if (bcrypt.compareSync(password, foundUser.hashedPass)) {
          let token = createToken(
            foundUser.dataValues.email,
            foundUser.dataValues.id
          );
          const exp = Date.now() + 1000 * 60 * 60 * 48;
          let bodyObj = {
            email: foundUser.dataValues.email,
            userId: foundUser.dataValues.id,
            bio: foundUser.dataValues.bio,
            photo_added: foundUser.dataValues.photo_added,
            token: token,
            exp: exp,
          };
          res.status(200).send(bodyObj);
        } else {
          res.status(400).send("incorect password, please try again");
        }
      } else {
        res.status(400).send("sorry that email isn't in our database");
      }
    } catch (err) {
      console.log("error in loggin");
      console.log(err);
      res.sendStatus(400);
    }
  },
};
