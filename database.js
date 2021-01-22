const {Sequelize, DataTypes} = require("sequelize");
const moment = require("moment");
const db = new Sequelize (process.env.DB, process.env.DBUSER, process.env.DBPASS,{
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: "mysql"
}
) 

const User = db.define('User', {
    id: {
        field: "id", 
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        field: "name", 
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        field:"lastname",
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        field: "email",
        type: DataTypes.STRING,
        allowNull: false
    },
    admin: {
        field: "admin",
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    password: {
        field: "password",
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: moment().format("YYY-MM-DD HH:mm:ss")
    },
    updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: moment().format("YYY-MM-DD HH:mm:ss")
    },
        
});

module.exports = {User}