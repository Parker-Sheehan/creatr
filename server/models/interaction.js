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
            references: { model: 'users', key: 'id' }
        },
        beingInteractedWith: {
            type: DataTypes.INTEGER,
            references: { model: 'users', key: 'id' }
        },
        liked: {
            type: DataTypes.BOOLEAN
        }

    })
}