require('dotenv').config()


const {db} = require('./utils/database')
const {User} = require('./models/user')
const {Photo} = require('./models/photo')
const {Message} = require('./models/messages')
const {Interaction} = require('./models/interaction')
const {ChatRoom} = require('./models/chatRoom')
const {authenticate} = require('./middleware/authenticated')


const express = require('express')
const cors = require('cors')

const {signUp, logIn, addInfo} = require('./controller/account')
const {getProfiles, userProfile, destroyUser, likeUser, dislikeUser} = require('./controller/interaction')

const app = express()

User.hasMany(Interaction)
Interaction.belongsTo(User, {foreignKey: 'doingInteractiond'})

User.hasMany(Photo)
Photo.belongsTo(User)

User.hasMany(ChatRoom)
ChatRoom.belongsTo(User)

User.hasMany(Message)
Message.belongsTo(User)

ChatRoom.hasMany(Message)
Message.belongsTo(ChatRoom)


app.use(express.json())
app.use(cors())

//account stuff
app.post('/signUp', signUp)
app.post('/logIn', logIn)
app.put('/addInfo/:id', authenticate ,addInfo)

//interactability
app.post('/profiles', authenticate, getProfiles)
app.post('/userProfile', authenticate, userProfile)
app.delete('/destroy', authenticate, destroyUser)
app.post('/like', authenticate, likeUser)
app.post('/dislike', authenticate, dislikeUser)



db
    .sync()
    .then(() => {
        app.listen(4000, () => console.log(`db sync successful & server runnig on port 4000`))
    })
