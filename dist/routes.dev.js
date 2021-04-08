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
    updateUserInformation = _require.updateUserInformation;

var _require2 = require('./database-RegionsAndCompaniesFunctions'),
    getAllRegisters = _require2.getAllRegisters,
    addNewRegister = _require2.addNewRegister,
    updateRegister = _require2.updateRegister,
    deleteRegister = _require2.deleteRegister;

var _require3 = require('./database-ContactFunctions'),
    getContacts = _require3.getContacts,
    getContactChannels = _require3.getContactChannels,
    getContactPreferences = _require3.getContactPreferences,
    deleteContact = _require3.deleteContact,
    searchContacts = _require3.searchContacts;

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
var authorizationPassword = process.env.AuthPassword;

function verifyToken(req, res, next) {
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
  max: 1000
});
app.post('/login', limiter, function _callee2(req, res) {
  var loginRequest, passwordRequest, user, objectUser, objectPassword;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          loginRequest = {
            user: req.body.user
          };
          passwordRequest = req.body.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(getUser(loginRequest));

        case 4:
          user = _context2.sent;
          console.log(user);

          if (user.length === 0) {
            res.status(400).send("invalid user or password");
          } else {
            objectUser = user[0];
            objectPassword = objectUser.password;
            console.log(objectPassword);
            console.log(passwordRequest);
            bcrypt.compare(passwordRequest, objectPassword, function _callee(err, result) {
              var userToken, isAdmin, adminPrivilege;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (result) {
                        userToken = jwt.sign({
                          user: user
                        }, authorizationPassword);
                        isAdmin = jwt.verify(userToken, authorizationPassword);
                        adminPrivilege = isAdmin.user[0].admin;
                        res.status(200).json({
                          userToken: userToken,
                          adminPrivilege: adminPrivilege
                        });
                      } else {
                        res.status(400).send("invalid user or password");
                      }

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
          }

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.use(verifyToken); // users 
// admin creates users

app.get('/users', function _callee3(req, res) {
  var allUsers;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(getAllRegisters('User'));

        case 2:
          allUsers = _context3.sent;
          res.status(200).json(allUsers);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.post('/users', function _callee6(req, res) {
  var user, existsUser, saltRounds;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          console.log('anda');
          user = {
            name: req.body.body.name,
            lastname: req.body.body.lastname,
            email: req.body.body.email,
            admin: req.body.body.role,
            password: req.body.body.password,
            repeatPassword: req.body.body.repeatPassword
          };
          _context6.next = 4;
          return regeneratorRuntime.awrap(checkUserInDB(user));

        case 4:
          existsUser = _context6.sent;

          if (existsUser.length == 0) {
            saltRounds = 10;
            bcrypt.genSalt(saltRounds, function _callee5(err, salt) {
              return regeneratorRuntime.async(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      bcrypt.hash(user.password, salt, function _callee4(err, hash) {
                        var userCreated;
                        return regeneratorRuntime.async(function _callee4$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                if (!err) {
                                  _context4.next = 4;
                                  break;
                                }

                                throw res.status(400).send("An error has happened");

                              case 4:
                                Object.defineProperty(user, 'hash', {
                                  value: hash
                                });
                                _context4.next = 7;
                                return regeneratorRuntime.awrap(createUser(user));

                              case 7:
                                userCreated = _context4.sent;
                                res.status(201).send('User successfully activated');

                              case 9:
                              case "end":
                                return _context4.stop();
                            }
                          }
                        });
                      });

                    case 1:
                    case "end":
                      return _context5.stop();
                  }
                }
              });
            });
          } else {
            res.status(400).send("El usuario ya existe");
          }

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.put('/users/:id', function _callee7(req, res) {
  var user, userUpdated;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          user = {
            id: req.params.id,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            admin: req.body.perfil
          };
          _context7.next = 3;
          return regeneratorRuntime.awrap(updateUserInformation(user));

        case 3:
          userUpdated = _context7.sent;
          console.log(userUpdated);

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
});
app["delete"]('/users/:id', function _callee8(req, res) {
  var id, userDeleted;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          console.log(id);
          _context8.next = 4;
          return regeneratorRuntime.awrap(deleteRegister('User', id));

        case 4:
          userDeleted = _context8.sent;
          res.status(200).send("User successfully deleted"); // FALTA 404 USER NOT FOUND

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  });
}); // sacar

app.post('/signup', checkPassword, function _callee9(req, res) {
  var user, validUser, saltRounds;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          user = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            admin: req.body.perfil,
            password: req.body.password,
            repeatPassword: req.body.repeatPassword
          };
          _context9.next = 3;
          return regeneratorRuntime.awrap(checkUserInDB(user));

        case 3:
          validUser = _context9.sent;
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
          return _context9.stop();
      }
    }
  });
}); // regions 

app.get('/regions', function _callee10(req, res) {
  var allLocations, allRegions, allCountries, allCities, locationsArray, mappedLocations;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(getAllRegisters('Region'));

        case 2:
          allLocations = _context10.sent;
          allRegions = allLocations[0];
          allCountries = allLocations[1];
          allCities = allLocations[2];
          locationsArray = [];
          mappedLocations = allRegions.map(function (region) {
            var eachLocation = Object.assign({
              "regionId": region.id,
              "regionName": region.name,
              "countries": []
            });
            allCountries.map(function (country) {
              if (region.id === country.RegionId) {
                var eachCountry = {
                  "countryId": country.id,
                  "countryName": country.name,
                  "cities": []
                };
                eachLocation.countries.push(eachCountry);
                allCities.map(function (city) {
                  if (country.id === city.CountryId) {
                    var eachCity = {
                      "cityId": city.id,
                      "cityName": city.name
                    };
                    eachCountry.cities.push(eachCity);
                  }
                });
              }
            });
            locationsArray.push(eachLocation);
          });
          res.status(200).json(locationsArray);

        case 9:
        case "end":
          return _context10.stop();
      }
    }
  });
});
app.get('/countries/:id', function _callee11(req, res) {
  var regionId, allCountries, countriesArray, mappedCountries;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          regionId = req.params.id;
          _context11.next = 3;
          return regeneratorRuntime.awrap(getAllRegisters('Country', regionId));

        case 3:
          allCountries = _context11.sent;
          countriesArray = [];
          mappedCountries = allCountries.map(function (country) {
            var eachCountry = Object.assign({
              "countryName": country.dataValues.name,
              "countryId": country.dataValues.id
            });
            countriesArray.push(eachCountry);
          });
          res.status(200).json(countriesArray);

        case 7:
        case "end":
          return _context11.stop();
      }
    }
  });
});
app.get('/cities/:id', function _callee12(req, res) {
  var countryId, allCities, citiesArray, mappedCities;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          countryId = req.params.id;
          _context12.next = 3;
          return regeneratorRuntime.awrap(getAllRegisters('City', countryId));

        case 3:
          allCities = _context12.sent;
          citiesArray = [];
          mappedCities = allCities.map(function (city) {
            var eachCity = Object.assign({
              "cityName": city.dataValues.name,
              "cityId": city.dataValues.id
            });
            citiesArray.push(eachCity);
          });
          res.status(200).json(citiesArray);

        case 7:
        case "end":
          return _context12.stop();
      }
    }
  });
});
app.post('/regions', function _callee13(req, res) {
  var name, id;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          name = req.body.body.name;
          id = req.body.id;
          addNewRegister('Region', name, id);

        case 3:
        case "end":
          return _context13.stop();
      }
    }
  });
});
app.post('/countries', function _callee14(req, res) {
  var name, regionId;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          name = req.body.body.name;
          regionId = req.body.body.id;
          console.log(name, regionId);
          addNewRegister('Country', name, regionId);

        case 4:
        case "end":
          return _context14.stop();
      }
    }
  });
});
app.post('/cities', function _callee15(req, res) {
  var name, countryId;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          name = req.body.body.name;
          countryId = req.body.body.id;
          console.log(name, countryId);
          addNewRegister('City', name, countryId);

        case 4:
        case "end":
          return _context15.stop();
      }
    }
  });
});
app.put('/regions/:id', function _callee16(req, res) {
  var name, regionId;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          name = req.body;
          regionId = req.params.id;
          console.log(name, countryId);
          updateRegister();

        case 4:
        case "end":
          return _context16.stop();
      }
    }
  });
});
app.put('/countries/:id', function _callee17(req, res) {
  var name, countryId;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          name = req.body;
          countryId = req.params.id;
          console.log(name, countryId);

        case 3:
        case "end":
          return _context17.stop();
      }
    }
  });
});
app.put('/cities/:id', function _callee18(req, res) {
  var name, cityId;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          name = req.body;
          cityId = req.params.id;
          console.log(name, countryId);

        case 3:
        case "end":
          return _context18.stop();
      }
    }
  });
});
app["delete"]('/regions/:id', function _callee19(req, res) {
  var locationId;
  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          locationId = req.params.id;
          deleteRegister('Region', locationId);

        case 2:
        case "end":
          return _context19.stop();
      }
    }
  });
});
app["delete"]('/countries/:id', function _callee20(req, res) {
  var locationId;
  return regeneratorRuntime.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          locationId = req.params.id;
          deleteRegister('Country', locationId);

        case 2:
        case "end":
          return _context20.stop();
      }
    }
  });
});
app["delete"]('/cities/:id', function _callee21(req, res) {
  var locationId;
  return regeneratorRuntime.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          locationId = req.params.id;
          deleteRegister('City', locationId);

        case 2:
        case "end":
          return _context21.stop();
      }
    }
  });
}); // companies

app.get('/companies', function _callee22(req, res) {
  var allCompanies, mappedCompanies;
  return regeneratorRuntime.async(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return regeneratorRuntime.awrap(getAllRegisters('Company'));

        case 2:
          allCompanies = _context22.sent;
          mappedCompanies = allCompanies.map(function (item) {
            return Object.assign({
              id: item.id,
              name: item.name,
              address: item.address,
              email: item.email,
              telephone: item.telephone,
              city: item.City.name,
              country: item.City.Country.name,
              region: item.City.Country.Region.name
            });
          });
          res.status(200).json(mappedCompanies);

        case 5:
        case "end":
          return _context22.stop();
      }
    }
  });
});
app.post('/companies', function _callee23(req, res) {
  var newCompany;
  return regeneratorRuntime.async(function _callee23$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          newCompany = {
            name: req.body.body.name,
            cityId: req.body.body.cityId,
            address: req.body.body.address,
            email: req.body.body.email,
            telephone: req.body.body.telephone
          };
          addNewRegister('Company', newCompany);

        case 2:
        case "end":
          return _context23.stop();
      }
    }
  });
});
app.put('/companies', function _callee24(req, res) {
  var companyToUpdate, updatedCompany;
  return regeneratorRuntime.async(function _callee24$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          companyToUpdate = {
            id: req.body.id,
            name: req.body.name,
            cityId: req.body.cityId,
            address: req.body.address,
            email: req.body.email,
            telephone: req.body.telephone
          };
          _context24.next = 3;
          return regeneratorRuntime.awrap(updateRegister('Çompany', companyToUpdate));

        case 3:
          updatedCompany = _context24.sent;
          res.status(200).send("updated");

        case 5:
        case "end":
          return _context24.stop();
      }
    }
  });
});
app["delete"]('/companies/:id', function _callee25(req, res) {
  var companyId;
  return regeneratorRuntime.async(function _callee25$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          companyId = req.params.id;
          deleteRegister('Company', companyId);

        case 2:
        case "end":
          return _context25.stop();
      }
    }
  });
});
app.get('/contacts', function _callee26(req, res) {
  var allContacts, contacts, mappedContacts;
  return regeneratorRuntime.async(function _callee26$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          _context26.next = 2;
          return regeneratorRuntime.awrap(getContacts());

        case 2:
          allContacts = _context26.sent;
          contacts = [];
          mappedContacts = allContacts.forEach(function (item) {
            var eachContact = Object.assign({
              id: item.id,
              name: item.name,
              lastname: item.lastname,
              email: item.email,
              country: item.City.Country.name,
              region: item.City.Country.Region.name,
              company: item.Company.name,
              position: item.position,
              favoriteChannels: [],
              interest: item.interest
            });
            var favoriteChannels = allContacts.map(function (element) {
              if (item.id == element.id) {
                var contactChannels = element.contact_channels;
                contactChannels.forEach(function (channel) {
                  if (channel.preference.name == 'Favorito') {
                    eachContact.favoriteChannels.push(channel.contact_social_medium.name);
                    contacts.push(eachContact);
                  }
                });
              } else {
                contacts.push(eachContact);
              }
            });
          });
          res.status(200).json(contacts);

        case 6:
        case "end":
          return _context26.stop();
      }
    }
  });
});
app.post('/contacts', function _callee27(req, res) {
  return regeneratorRuntime.async(function _callee27$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
        case "end":
          return _context27.stop();
      }
    }
  });
});
app["delete"]('/contacts/:id', function _callee28(req, res) {
  var contactId;
  return regeneratorRuntime.async(function _callee28$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          contactId = req.params.id;
          deleteContact(contactId);

        case 2:
        case "end":
          return _context28.stop();
      }
    }
  });
});
app.get('/contacts/search', function _callee29(req, res) {
  var filters, contacts, contactsObtained, mappedContacts;
  return regeneratorRuntime.async(function _callee29$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          filters = req.headers.body;
          _context29.next = 3;
          return regeneratorRuntime.awrap(searchContacts(filters));

        case 3:
          contacts = _context29.sent;
          contactsObtained = [];
          mappedContacts = contacts.forEach(function (item) {
            var eachContact = Object.assign({
              id: item.id,
              name: item.name,
              lastname: item.lastname,
              email: item.email,
              country: item.City.Country.name,
              region: item.City.Country.Region.name,
              company: item.Company.name,
              position: item.position,
              favoriteChannels: [],
              interest: item.interest
            });
            var favoriteChannels = contacts.map(function (element) {
              if (item.id == element.id) {
                var contactChannels = element.contact_channels;
                contactChannels.forEach(function (channel) {
                  if (channel.preference.name == 'Favorito') {
                    eachContact.favoriteChannels.push(channel.contact_social_medium.name);
                    contactsObtained.push(eachContact);
                  }
                });
              } else {
                contactsObtained.push(eachContact);
              }
            });
          });
          res.status(200).json(contactsObtained);

        case 7:
        case "end":
          return _context29.stop();
      }
    }
  });
});
app.get('/contactchannels', function _callee30(req, res) {
  var allContactChannels;
  return regeneratorRuntime.async(function _callee30$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          _context30.next = 2;
          return regeneratorRuntime.awrap(getContactChannels());

        case 2:
          allContactChannels = _context30.sent;
          res.status(200).json(allContactChannels);

        case 4:
        case "end":
          return _context30.stop();
      }
    }
  });
});
app.get('/preferences', function _callee31(req, res) {
  var allContactPreferences;
  return regeneratorRuntime.async(function _callee31$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          _context31.next = 2;
          return regeneratorRuntime.awrap(getContactPreferences());

        case 2:
          allContactPreferences = _context31.sent;
          res.status(200).json(allContactPreferences);

        case 4:
        case "end":
          return _context31.stop();
      }
    }
  });
});
app.listen(3010, function () {
  return console.log("server started");
});

function checkPassword(req, res, next) {
  return regeneratorRuntime.async(function checkPassword$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          if (req.body.password === req.body.repeatPassword) {
            next();
          } else {
            res.status(400).send("Passwords must be the same");
          }

        case 1:
        case "end":
          return _context32.stop();
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