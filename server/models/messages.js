const {DataTypes} = require('sequelize')

const {db} = require('../utils/database')

module.exports = {
    Message : db.define('message', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        room_id: {
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull:false
        },
        name: {
            type: DataTypes.TEXT
        }
    })
}