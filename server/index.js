require('dotenv').config()


const {db} = require('./utils/database')
const {User} = require('./models/user')
const {Photo} = require('./models/photo')
const {Message} = require('./models/messages')
const {Interaction} = require('./models/interaction')
const {ChatRoom} = require('./models/chatRoom')


const express = require('express')
const cors = require('cors')
const { register } = require


const {PORT} = process.env
const {signUp, logIn} = require('./controller/account')

const app = express()




app.use(express.json())
app.use(cors())

//AUTH
app.post('/signUp', signUp)
app.post('/logIn', logIn)
// app.post('/bio/:id', addBio)


db
    .sync()
    .then(() => {
        app.listen(4000, () => console.log(`db sync successful & server runnig on port 4000`))
    })