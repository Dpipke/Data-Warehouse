"use strict";

var _require = require("sequelize"),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var moment = require("moment");

var db = new Sequelize(process.env.DB, process.env.DBUSER, process.env.DBPASS, {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  dialect: "mysql"
});
var User = db.define('User', {
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
    field: "lastname",
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
  }
}, {
  timestamps: false
});
var Region = db.define('Region', {
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
  }
}, {
  timestamps: false
});
var Country = db.define('Country', {
  id: {
    field: "id",
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  RegionId: {
    field: "region_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true
  },
  name: {
    field: "name",
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});
var City = db.define('City', {
  id: {
    field: "id",
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  CountryId: {
    field: "country_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true
  },
  name: {
    field: "name",
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});
Region.hasMany(Country, {
  foreignKey: 'region_id'
});
Country.belongsTo(Region);
Country.hasMany(City, {
  foreignKey: 'country_id'
});
City.belongsTo(Country);
module.exports = {
  User: User,
  Region: Region,
  Country: Country,
  City: City
};