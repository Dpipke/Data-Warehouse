"use strict";

var app = require('express')();

var helmet = require('helmet');

var rateLimit = require('express-rate-limit');

var bodyParser = require("body-parser");

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var dotenv = require('dotenv').config();

var _require = require('./database-functions'),
    createUser = _require.createUser,
    checkUserInDB = _require.checkUserInDB,
    activateUser = _require.activateUser,
    getUser = _require.getUser,
    deleteUser = _require.deleteUser,
    updateUserInformation = _require.updateUserInformation;

app.use(bodyParser.json());
app.use(helmet());
app.use(verifyToken);
var authorizationPassword = process.env.AuthPassword;

function verifyToken(req, res, next) {
  console.log(req.headers.authorization);
  var token = req.headers.authorization.split(' ')[1];
  console.log(token);

  try {
    jwt.verify(token, authorizationPassword);
    next();
  } catch (error) {
    res.status(401).send(error);
  }
}

var limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5
}); // users 
// admin creates users

app.post('/users', filterAdmin, function _callee(req, res) {
  var user, userCreated;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            admin: req.body.perfil
          };
          _context.next = 3;
          return regeneratorRuntime.awrap(createUser(user));

        case 3:
          userCreated = _context.sent;
          res.status(201).json(userCreated);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.put('/users/:id', function _callee2(req, res) {
  var user, userUpdated;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = {
            id: req.params.id,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            admin: req.body.perfil
          };
          _context2.next = 3;
          return regeneratorRuntime.awrap(updateUserInformation(user));

        case 3:
          userUpdated = _context2.sent;
          console.log(userUpdated);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app["delete"]('/users', filterAdmin, function _callee3(req, res) {
  var user, userDeleted;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user = {
            id: req.body.id
          };
          _context3.next = 3;
          return regeneratorRuntime.awrap(deleteUser(user));

        case 3:
          userDeleted = _context3.sent;
          res.status(200).send("User successfully deleted"); // FALTA 404 USER NOT FOUND

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.post('/signup', checkPassword, function _callee4(req, res) {
  var user, validUser, saltRounds;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            admin: req.body.perfil,
            password: req.body.password,
            repeatPassword: req.body.repeatPassword
          };
          _context4.next = 3;
          return regeneratorRuntime.awrap(checkUserInDB(user));

        case 3:
          validUser = _context4.sent;
          console.log(validUser.length);

          if (validUser.length == 1) {
            saltRounds = 10;
            bcrypt.genSalt(saltRounds, function (err, salt) {
              bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) throw res.status(400).send("An error has happened");else {
                  Object.defineProperty(user, 'hash', {
                    value: hash
                  });
                  activateUser(user);
                  res.status(201).send('User successfully activated');
                }
              });
            });
          } else {
            res.status(404).send("Unexistent user. Contact Admin");
          }

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.post('/login', limiter, function _callee6(req, res) {
  var loginRequest, passwordRequest, user, objectUser, objectPassword;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          loginRequest = {
            user: req.body.user
          };
          passwordRequest = req.body.password;
          _context6.next = 4;
          return regeneratorRuntime.awrap(getUser(loginRequest));

        case 4:
          user = _context6.sent;
          console.log(user);

          if (user.length === 0) {
            res.status(400).send("invalid user or password");
          } else {
            objectUser = user[0];
            objectPassword = objectUser.password;
            console.log(objectPassword);
            console.log(passwordRequest);
            bcrypt.compare(passwordRequest, objectPassword, function _callee5(err, result) {
              var userToken;
              return regeneratorRuntime.async(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      if (result) {
                        userToken = jwt.sign({
                          user: user
                        }, authorizationPassword);
                        console.log(userToken);
                        res.status(200).json(userToken);
                      } else {
                        res.status(400).send("invalid user or password");
                      }

                    case 1:
                    case "end":
                      return _context5.stop();
                  }
                }
              });
            });
          }

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.listen(3010, function () {
  return console.log("server started");
});

function checkPassword(req, res, next) {
  return regeneratorRuntime.async(function checkPassword$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (req.body.password === req.body.repeatPassword) {
            next();
          } else {
            res.status(400).send("Passwords must be the same");
          }

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function filterAdmin(req, res, next) {
  var token = req.headers.authorization.split(' ')[1];
  var user = jwt.verify(token, authorizationPassword);
  var adminPrivilege = user.user[0].admin;
  console.log(adminPrivilege);

  if (adminPrivilege === true) {
    next();
  } else {
    res.status(403).send('forbidden access');
  }
}