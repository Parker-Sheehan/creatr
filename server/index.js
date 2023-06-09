require('dotenv').config()


const {db} = require('./utils/database')
const {User} = require('./models/user')
const {Photo} = require('./models/photo')
const {Message} = require('./models/messages')
const {Interaction} = require('./models/interaction')
const {ChatRoom} = require('./models/chatRoom')
const {authenticate} = require('./middleware/authenticated')
const path = require('path')


const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})
global.io = io

const _dirname = path.dirname("")
const buldPath = path.join(_dirname, "../src/build")

app.get('/*', function(req, res){

    res.sendFile(
        path.join(__dirname, "../src/build/indexedDB.html"),
        function (err){
            if(err){
                res.status(500).send(err)
            }
        }
    )
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on('join_room', (data) => {
        console.log(`joining room ${data}`)
        socket.join(data);
    });

    socket.on('send_message', (data) => {
        console.log('yay')
        console.log(data.message)
        console.log(data.room)
        socket.to(data.room).emit("receive_message", data)
    })
})


const {signUp, logIn, addInfo} = require('./controller/account')
const {getProfiles, userProfile, otherProfile, destroyUser, likeUser, dislikeUser, chatRoom, sendMessage, getMessage} = require('./controller/interaction')


User.hasMany(Interaction)
Interaction.belongsTo(User)

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
app.post('/otherProfile', authenticate, otherProfile)
app.delete('/destroy', authenticate, destroyUser)
app.post('/like', authenticate, likeUser)
app.post('/dislike', authenticate, dislikeUser)
app.post('/chatRoom', authenticate, chatRoom)
app.post('/sendMessage', authenticate, sendMessage)
app.post('/getMessage', authenticate, getMessage)



db
.sync()
.then(() => {
    server.listen(4000, () => console.log(`db sync successful & server runnig on port 4000`))
})
