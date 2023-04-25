require("dotenv").config();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET
const {user} = require('../models/user')


const createToken = (email, id) => {
    const payload = {email, id};
    return jwt.sign(payload, SECRET)
}



module.exports = {
    signUp: async (req, res) => {
        try{
            let {email, password} = req.body;
            console.log(email)


        }
        catch(err){
            console.log('error in reg')
            console.log(err)
            res.sendStatus(400)
        }
    }
}