const {DataTypes} = require('sequelize')

const {db} = require('../utils/database')

module.exports = {
    User : db.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: DataTypes.STRING,
        email:DataTypes.STRING,
        hashedPass: DataTypes.STRING,
        bio: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        photo_added: {
            type:DataTypes.BOOLEAN,
        defaultValue: false}
    })
}