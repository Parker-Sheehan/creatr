const { User } = require("../models/user");
const { interaction } = require("../models/interaction");
const { Op } = require("sequelize");

module.exports = {
  getProfiles: async (req, res) => {
    try {
      let userId = req.body.userId;
      let foundUsers = await User.findAll({
        where: { id: { [Op.ne]: userId } },
      });
      let profileArray = [];
      for (let i = 0; i < foundUsers.length; i++) {
        const profileObj = {
          bio: foundUsers[i].dataValues.bio,
          name: foundUsers[i].dataValues.name,
          photo: foundUsers[i].dataValues.photo_added,
          id: foundUsers[i].dataValues.id,
        };
        profileArray.push(profileObj);
      }
      console.log(foundUsers[0].dataValues);
      console.log(profileArray);
      res.status(200).send(profileArray);
    } catch (err) {
      console.log("err in getProfiles");
      console.log(err);
      res.sendStatus(400);
    }
  },
};
