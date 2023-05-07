const { User } = require("../models/user");
const { Interaction } = require("../models/interaction");
const { Op, where } = require("sequelize");
const { ChatRoom } = require("../models/chatRoom");
const { Message } = require("../models/messages");

module.exports = {
  getProfiles: async (req, res) => {
    try {
      let userId = req.app.locals.userId;
      let foundInteraction = await Interaction.findAll({
        where: { doingInteraction: userId },
      });
      // console.log("yay");
      let beenInteractedWith = [];
      for (let i = 0; i < foundInteraction.length; i++) {
        beenInteractedWith.push(
          foundInteraction[i].dataValues.beingInteractedWith
        );
      }
      // console.log(beenInteractedWith);

      let foundUsers = await User.findAll({
        where: {
          [Op.and]: [
            { id: { [Op.ne]: userId } },
            { id: { [Op.notIn]: beenInteractedWith } },
            { photo_added: { [Op.ne]: "" } },
          ],
        },
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
      // console.log('yay')
      // console.log(foundUsers[0]);
      // console.log(profileArray);
      res.status(200).send(profileArray);
    } catch (err) {
      console.log("err in getProfiles");
      console.log(err);
      res.sendStatus(400);
    }
  },
  userProfile: async (req, res) => {
    try {
      let userId = req.app.locals.userId;
      let foundUser = await User.findOne({
        where: { id: userId },
      });
      // console.log(foundUser);
      const profileObj = {
        bio: foundUser.dataValues.bio,
        name: foundUser.dataValues.name,
        photo: foundUser.dataValues.photo_added,
        id: foundUser.dataValues.id,
      };

      res.status(200).send(profileObj);
    } catch (err) {
      console.log("err in userProfile");
      console.log(err);
      res.sendStatus(400);
    }
  },
  destroyUser: async (req, res) => {
    try {
      let userId = req.app.locals.userId;
      User.destroy({
        where: { id: userId },
      });
      res.sendStatus(200);
    } catch (err) {
      console.log("err in destroyUser");
      console.log(err);
      res.sendStatus(400);
    }
  },
  likeUser: async (req, res) => {
    try {
      let doingInteraction = req.app.locals.userId;
      let beingInteractedWith = req.body.otherUserId;

      let interactionId = await Interaction.findOne({
        where: {
          [Op.and]: [
            { doingInteraction: doingInteraction },
            { beingInteractedWith: beingInteractedWith },
          ],
        },
      });

      if (interactionId) {
        await Interaction.update(
          { liked: true },
          {
            where: {
              [Op.and]: [
                { doingInteraction: doingInteraction },
                { beingInteractedWith: beingInteractedWith },
              ],
            },
          }
        );
      } else {
        await Interaction.create({
          doingInteraction: doingInteraction,
          beingInteractedWith: beingInteractedWith,
          liked: true,
        });
      }

      let bothInteracted = await Interaction.findOne({
        where: {
          [Op.and]: [
            { doingInteraction: beingInteractedWith },
            { beingInteractedWith: doingInteraction },
          ],
        },
      });
      // console.log("++++++++++++Both_INTERACTED++++++++++++++");
      // console.log(bothInteracted);
      if (bothInteracted) {
        // console.log('in Both Interacted')
        let newChatRoom = await ChatRoom.create({
          user_1: doingInteraction,
          user_2: beingInteractedWith,
          user_1_name: req.body.userName,
          user_2_name: req.body.otherUserName,
        });
        console.log("yay");
        console.log(newChatRoom.dataValues);
        let firstEmit = `${newChatRoom.dataValues.user_1} ${newChatRoom.dataValues.user_1_name}`;
        let data = newChatRoom.dataValues.user_2_name;
        global.io.to(firstEmit).emit("match_made", data);
        let secondEmit = `${newChatRoom.dataValues.user_2} ${newChatRoom.dataValues.user_2_name}`;
        data = newChatRoom.dataValues.user_1_name;
        global.io.to(secondEmit).emit("match_made", data);
        let arrOfChatRooms = await ChatRoom.findAll({
          where: {
            [Op.or]: [
              { user_1: doingInteraction },
              { user_2: doingInteraction },
            ],
          },
          attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
        })      
        let arrOfIdForPfp = []
        for(let i = 0; i < arrOfChatRooms.length; i++){
          if (arrOfChatRooms[i].dataValues.user_1 != userId){
            arrOfIdForPfp.push(`${arrOfChatRooms[i].dataValues.user_1}`)
          }else{
          arrOfIdForPfp.push(`${arrOfChatRooms[i].dataValues.user_2}`)
          }
        }
        console.log(arrOfIdForPfp)
        let arrOfPfp = await User.findAll({
          
          where: {
            id: {
            [Op.in]: arrOfIdForPfp
          }
        },
        attributes: ['photo_added']
        })
        console.log('yay')
        console.log(arrOfPfp[1].dataValues)
        return res.status(200).send({arrOfChatRooms: [...arrOfChatRooms], arrOfPfp: [...arrOfPfp]});
      }
      res.status(200).send("yay");
    } catch (err) {
      console.log("err in likeUser");
      console.log(err);
      res.sendStatus(400);
    }
  },
  dislikeUser: async (req, res) => {
    try {
      let doingInteraction = req.app.locals.userId;
      let beingInteractedWith = req.body.otherUserId;

      Interaction.create({
        doingInteraction: doingInteraction,
        beingInteractedWith: beingInteractedWith,
        liked: false,
      });
      res.sendStatus(200);
    } catch (err) {
      console.log("err in dislikeUser");
      console.log(err);
      res.sendStatus(400);
    }
  },
  chatRoom: async (req, res) => {
    try {
      let userId = req.app.locals.userId;
      let arrOfChatRooms = await ChatRoom.findAll({
        where: {
          [Op.or]: [{ user_1: userId }, { user_2: userId }],
        },
        attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
      })
      console.log(arrOfChatRooms[0].dataValues)
      let arrOfIdForPfp = []
      for(let i = 0; i < arrOfChatRooms.length; i++){
        if (arrOfChatRooms[i].dataValues.user_1 != userId){
          arrOfIdForPfp.push(`${arrOfChatRooms[i].dataValues.user_1}`)
        }else{
        arrOfIdForPfp.push(`${arrOfChatRooms[i].dataValues.user_2}`)
        }
      }
      console.log(arrOfIdForPfp)
      let arrOfPfp = await User.findAll({
        
        where: {
          id: {
          [Op.in]: arrOfIdForPfp
        }
      },
      attributes: ['photo_added']
      })
      console.log('yay')
      console.log(arrOfPfp[1].dataValues)
      return res.status(200).send({arrOfChatRooms: [...arrOfChatRooms], arrOfPfp: [...arrOfPfp]});
    } catch (err) {
      console.log("err in chatRoom");
      console.log(err);
      res.sendStatus(400);
    }
  },
  sendMessage: async (req, res) => {
    try {
      let userId = req.app.locals.userId;
      let { room, message, name } = req.body;
      // console.log(req.body)
      // console.log(room)
      // console.log(message)

      await Message.create({
        room_id: room,
        user_id: userId,
        message: message,
        name: name,
      });
      let findMessage = await Message.findAll({ where: { room_id: room } });
      return res.status(200).send(findMessage);
    } catch (err) {
      console.log("err in sendMessage");
      console.log(err);
      res.sendStatus(400);
    }
  },
  getMessage: async (req, res) => {
    try {
      let { room } = req.body;

      let findMessage = await Message.findAll({ where: { room_id: room } });
      // console.log(findMessage)
      return res.status(200).send(findMessage);
    } catch (err) {
      res.sendStatus(400);
    }
  },
};
