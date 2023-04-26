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
            token: token,
            exp: exp
        };
        res.status(200).send(bodyObj)
      }
    } catch (err) {
      console.log("error in reg");
      console.log(err);
      res.sendStatus(400);
    }
  },
};
