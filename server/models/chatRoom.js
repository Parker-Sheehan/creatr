const {DataTypes} = require('sequelize')

const {db} = require('../utils/database')

module.exports = {
    ChatRoom : db.define('chatRoom', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        user_1: {
            type: DataTypes.INTEGER,
        },
        user_1_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_2: {
            type: DataTypes.INTEGER,
        },
        user_2_name: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    })
}