"use strict";

var app = require('express')();

var helmet = require('helmet');

var rateLimit = require('express-rate-limit');

var bodyParser = require("body-parser");

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var cors = require('cors');

var dotenv = require('dotenv').config();

var _require = require('./database-UserFunctions'),
    createUser = _require.createUser,
    checkUserInDB = _require.checkUserInDB,
    activateUser = _require.activateUser,
    getUser = _require.getUser,
    deleteUser = _require.deleteUser,
    updateUserInformation = _require.updateUserInformation;

var _require2 = require('./database-RegionsAndCompaniesFunctions'),
    getAllRegisters = _require2.getAllRegisters,
    addNewLocation = _require2.addNewLocation,
    updateRegister = _require2.updateRegister,
    deleteRegister = _require2.deleteRegister;

app.use(bodyParser.json());
app.use(helmet()); // app.use(verifyToken);

app.use(cors());
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

app.get('/users', function _callee(req, res) {
  var allUsers;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getAllRegisters('User'));

        case 2:
          allUsers = _context.sent;
          res.status(200).json(allUsers);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post('/users', function _callee2(req, res) {
  var user, userCreated;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            admin: req.body.perfil
          };
          _context2.next = 3;
          return regeneratorRuntime.awrap(createUser(user));

        case 3:
          userCreated = _context2.sent;
          res.status(201).json(userCreated);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.put('/users/:id', function _callee3(req, res) {
  var user, userUpdated;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user = {
            id: req.params.id,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            admin: req.body.perfil
          };
          _context3.next = 3;
          return regeneratorRuntime.awrap(updateUserInformation(user));

        case 3:
          userUpdated = _context3.sent;
          console.log(userUpdated);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app["delete"]('/users', function _callee4(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.body.id;
          console.log(req.body); // const userDeleted = await deleteUser(id)

          res.status(200).send("User successfully deleted"); // FALTA 404 USER NOT FOUND

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.post('/signup', checkPassword, function _callee5(req, res) {
  var user, validUser, saltRounds;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          user = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            admin: req.body.perfil,
            password: req.body.password,
            repeatPassword: req.body.repeatPassword
          };
          _context5.next = 3;
          return regeneratorRuntime.awrap(checkUserInDB(user));

        case 3:
          validUser = _context5.sent;
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
          return _context5.stop();
      }
    }
  });
});
app.post('/login', limiter, function _callee7(req, res) {
  var loginRequest, passwordRequest, user, objectUser, objectPassword;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          loginRequest = {
            user: req.body.user
          };
          passwordRequest = req.body.password;
          _context7.next = 4;
          return regeneratorRuntime.awrap(getUser(loginRequest));

        case 4:
          user = _context7.sent;
          console.log(user);

          if (user.length === 0) {
            res.status(400).send("invalid user or password");
          } else {
            objectUser = user[0];
            objectPassword = objectUser.password;
            console.log(objectPassword);
            console.log(passwordRequest);
            bcrypt.compare(passwordRequest, objectPassword, function _callee6(err, result) {
              var userToken;
              return regeneratorRuntime.async(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
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
                      return _context6.stop();
                  }
                }
              });
            });
          }

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
}); // regions 

app.get('/regions', function _callee8(req, res) {
  var allLocations;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(getAllRegisters('Region'));

        case 2:
          allLocations = _context8.sent;
          console.log(allLocations);
          res.status(200).json(allLocations);

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  });
});
app.post('/regions', function _callee9(req, res) {
  var name, id, model;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          name = req.body.name;
          id = req.body.id;
          model = req.body.model;
          addNewLocation(model, name, id);

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
});
app["delete"]('/regions', function _callee10(req, res) {
  var locationId, model;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          locationId = req.body.id;
          model = req.body.model;
          deleteRegister(model, locationId);

        case 3:
        case "end":
          return _context10.stop();
      }
    }
  });
}); // companies

app.get('/companies', function _callee11(req, res) {
  var allCompanies;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(getAllRegisters('Company'));

        case 2:
          allCompanies = _context11.sent;
          console.log(allCompanies);
          res.status(200).json(allCompanies);

        case 5:
        case "end":
          return _context11.stop();
      }
    }
  });
});
app.post('/companies', function _callee12(req, res) {
  var newCompany;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          newCompany = {
            name: req.body.name,
            cityId: req.body.cityId,
            address: req.body.address,
            email: req.body.email,
            telephone: req.body.telephone
          };
          addNewLocation('Company', newCompany);

        case 2:
        case "end":
          return _context12.stop();
      }
    }
  });
});
app.put('/companies', function _callee13(req, res) {
  var companyToUpdate, updatedCompany;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          companyToUpdate = {
            id: req.body.id,
            name: req.body.name,
            cityId: req.body.cityId,
            address: req.body.address,
            email: req.body.email,
            telephone: req.body.telephone
          };
          _context13.next = 3;
          return regeneratorRuntime.awrap(updateRegister('Çompany', companyToUpdate));

        case 3:
          updatedCompany = _context13.sent;
          res.status(200).send("updated");

        case 5:
        case "end":
          return _context13.stop();
      }
    }
  });
});
app["delete"]('/companies', function _callee14(req, res) {
  var companyId;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          companyId = req.body.id;
          deleteRegister('Company', companyId);

        case 2:
        case "end":
          return _context14.stop();
      }
    }
  });
});
app.listen(3010, function () {
  return console.log("server started");
});

function checkPassword(req, res, next) {
  return regeneratorRuntime.async(function checkPassword$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          if (req.body.password === req.body.repeatPassword) {
            next();
          } else {
            res.status(400).send("Passwords must be the same");
          }

        case 1:
        case "end":
          return _context15.stop();
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