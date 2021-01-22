"use strict";

var _require = require("sequelize"),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var _require2 = require('./database'),
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
          userToCheck = User.findAll({
            where: {
              email: loginRequest.user
            }
          });
          return _context4.abrupt("return", userToCheck);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function deleteUser(user) {
  return regeneratorRuntime.async(function deleteUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(User.destroy({
            where: {
              id: user.id
            }
          }));

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function updateUserInformation(user) {
  var set, userUpdated;
  return regeneratorRuntime.async(function updateUserInformation$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          set = Object.keys(user).filter(function (key) {
            return user[key] != null && key != "id";
          }).map(function (key) {
            return "".concat(key, " : ").concat(JSON.stringify(user[key]));
          }).join(",");
          console.log(set);
          _context6.next = 4;
          return regeneratorRuntime.awrap(User.update({
            set: set
          }, {
            where: {
              id: +user.id
            }
          }));

        case 4:
          userUpdated = _context6.sent;
          console.log(userUpdated);
          return _context6.abrupt("return", userUpdated);

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
}

module.exports = {
  createUser: createUser,
  checkUserInDB: checkUserInDB,
  activateUser: activateUser,
  getUser: getUser,
  deleteUser: deleteUser,
  updateUserInformation: updateUserInformation
};