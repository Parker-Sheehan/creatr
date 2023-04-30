const {DataTypes} = require('sequelize')

const {db} = require('../utils/database')

module.exports = {
    Interaction : db.define('interaction', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        doingInteraction: {
            type: DataTypes.INTEGER,
        },
        beingInteractedWith: {
            type: DataTypes.INTEGER,
        },
        liked: {
            type: DataTypes.BOOLEAN
        }

    })
}