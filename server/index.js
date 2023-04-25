require('dotenv').config()


const {db} = require('./utils/database')
const {user} = require('./models/user')

const express = require('express')
const cors = require('cors')


const {PORT} = process.env

const app = express()




app.use(express.json())
app.use(cors())

db
    .sync()
    .then(() => {
        app.listen(PORT, () => console.log(`db sync successful & server runnig on port ${process.env.PORT}`))
    })