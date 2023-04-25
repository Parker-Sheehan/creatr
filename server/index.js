require('dotenv').config()


const {db} = require('./utils/database')
const {user} = require('./models/user')

const express = require('express')
const cors = require('cors')
const { register } = require


const {PORT} = process.env
const {signUp} = require('./controller/account')

const app = express()




app.use(express.json())
app.use(cors())

//AUTH
app.post('/signUp', signUp)

db
    .sync()
    .then(() => {
        app.listen(PORT, () => console.log(`db sync successful & server runnig on port ${process.env.PORT}`))
    })