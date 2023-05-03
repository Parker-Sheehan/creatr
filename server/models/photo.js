const {DataTypes} = require('sequelize')

const {db} = require('../utils/database')

module.exports = {
    Photo : db.define('photo', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
    })
}