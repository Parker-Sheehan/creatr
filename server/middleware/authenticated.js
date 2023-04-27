require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    authenticate: (req, res, next) => {
        const token = req.body.token

        if (!token) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let verify
        
        try{
            verify = jwt.verify(token, SECRET) 
        }catch(err){

            throw err
        }


        if (!verify) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()


    }
}