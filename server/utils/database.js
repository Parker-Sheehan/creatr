require('dotenv').config()
const DATABASE = process.env.DATABASE
const {Sequelize} = require('sequelize')

const db = new Sequelize(
    DATABASE,
    {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
)

module.exports = {
    db:db
}