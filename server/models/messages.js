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
            references: { model: 'chatRooms', key: 'id' }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: { model: 'users', key: 'id' }
        },
        message: {
            type: DataTypes.TEXT,
            allowNull:false
        },
    })
}