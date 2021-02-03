"use strict";

var _require = require("sequelize"),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var _require2 = require('./database-models'),
    User = _require2.User;

function createUser(userProvided) {
  var role, userToCreate;
  return regeneratorRuntime.async(function createUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          role = userProvided.admin === "Admin";
          _context.next = 3;
          return regeneratorRuntime.awrap(User.create({
            name: userProvided.name,
            lastname: userProvided.lastname,
            email: userProvided.email,
            admin: role
          }));

        case 3:
          userToCreate = _context.sent;

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function checkUserInDB(user) {
  var role, userToCheck;
  return regeneratorRuntime.async(function checkUserInDB$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          role = user.admin === "Admin";
          userToCheck = User.findAll({
            where: {
              email: user.email,
              admin: role
            }
          });
          return _context2.abrupt("return", userToCheck);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function activateUser(user) {
  var activeUser;
  return regeneratorRuntime.async(function activateUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.update({
            password: user.hash
          }, {
            where: {
              email: user.email
            }
          }));

        case 2:
          activeUser = _context3.sent;

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function getUser(loginRequest) {
  var userToCheck;
  return regeneratorRuntime.async(function getUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(User.findAll({
            where: {
              email: loginRequest.user
            }
          }));

        case 2:
          userToCheck = _context4.sent;
          return _context4.abrupt("return", userToCheck);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function updateUserInformation(user) {
  var set, setProperties, obj, userUpdated;
  return regeneratorRuntime.async(function updateUserInformation$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          set = Object.keys(user).filter(function (key) {
            return user[key] != null && key != "id";
          }).map(function (key) {
            return "".concat(key, " : ").concat(user[key]);
          }).join(",");
          console.log(set);
          setProperties = set.split(',');
          obj = {};
          setProperties.forEach(function (setProperties) {
            var setValues = setProperties.split(':');
            obj[setValues[0]] = setValues[1];
          });
          _context5.next = 7;
          return regeneratorRuntime.awrap(User.update({
            obj: obj
          }, {
            where: {
              id: +user.id
            }
          }));

        case 7:
          userUpdated = _context5.sent;
          console.log(userUpdated);
          return _context5.abrupt("return", userUpdated);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
}

module.exports = {
  createUser: createUser,
  checkUserInDB: checkUserInDB,
  activateUser: activateUser,
  getUser: getUser,
  updateUserInformation: updateUserInformation
};