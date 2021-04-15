"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require("sequelize"),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var _require2 = require('./database-models'),
    Contact = _require2.Contact,
    ContactChannel = _require2.ContactChannel,
    ChannelSocialMedia = _require2.ChannelSocialMedia,
    Preference = _require2.Preference,
    Company = _require2.Company,
    City = _require2.City,
    Country = _require2.Country,
    Region = _require2.Region;

function getContacts() {
  var contactsTable, allContacts, mappedContacts;
  return regeneratorRuntime.async(function getContacts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Contact.findAll({
            include: {
              all: true,
              nested: true
            } // include:{
            //     model:City,  
            //     include: {
            //         all: true, nested: true, required: true
            //         // model: Country,
            //         // nested: true,
            //         // include: {
            //         //     model: Region,
            //         //     nested: true,
            //         // }
            //     }
            // },        
            // include: {
            //     model: Company,
            //     nested: true
            // },
            // include:{
            //     model:ContactChannel,
            //     include: {
            //         all: true, nested: true
            //     }
            // }

          }));

        case 2:
          contactsTable = _context.sent;
          // const contacts = JSON.stringify(contactsTable)
          allContacts = [];
          mappedContacts = contactsTable.forEach(function (item) {
            delete item.City;
            allContacts.push(item);
          });
          return _context.abrupt("return", allContacts);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getContactChannels() {
  var contactChannelsArray;
  return regeneratorRuntime.async(function getContactChannels$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(ChannelSocialMedia.findAll());

        case 2:
          contactChannelsArray = _context2.sent;
          return _context2.abrupt("return", contactChannelsArray);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function getContactPreferences() {
  var contactPreferenceArray;
  return regeneratorRuntime.async(function getContactPreferences$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Preference.findAll());

        case 2:
          contactPreferenceArray = _context3.sent;
          return _context3.abrupt("return", contactPreferenceArray);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function deleteContact(id) {
  var contactToDelete;
  return regeneratorRuntime.async(function deleteContact$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Contact.destroy({
            where: {
              id: id
            }
          }));

        case 2:
          contactToDelete = _context4.sent;

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function searchContacts(register) {
  var object, set, contactsSearch;
  return regeneratorRuntime.async(function searchContacts$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          object = JSON.parse(register);
          set = Object.entries(object).reduce(function (output, _ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                value = _ref2[1];

            return value ? Object.assign({}, output, _defineProperty({}, key, value)) : output;
          }, {});
          _context5.next = 4;
          return regeneratorRuntime.awrap(Contact.findAll({
            where: set,
            include: {
              all: true,
              nested: true
            }
          }));

        case 4:
          contactsSearch = _context5.sent;
          return _context5.abrupt("return", contactsSearch);

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function createContact(data) {
  var contact;
  return regeneratorRuntime.async(function createContact$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Contact.create({
            name: data.name,
            lastname: data.lastname,
            position: data.position,
            CompanyId: data.companyId,
            email: data.email,
            address: data.address,
            interest: data.interest,
            CityId: data.cityId
          }));

        case 2:
          contact = _context6.sent;
          return _context6.abrupt("return", contact.id);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function addContactChannel(data, id) {
  return regeneratorRuntime.async(function addContactChannel$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          data.contactChannels.forEach(function _callee(item) {
            var contactChannel;
            return regeneratorRuntime.async(function _callee$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return regeneratorRuntime.awrap(ContactChannel.create({
                      contactId: id,
                      contactChannelSocialMediaId: +item.ContactChannel,
                      user_account: item.userAccount
                    }));

                  case 2:
                    contactChannel = _context7.sent;

                  case 3:
                  case "end":
                    return _context7.stop();
                }
              }
            });
          });

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
}

module.exports = {
  getContacts: getContacts,
  getContactChannels: getContactChannels,
  getContactPreferences: getContactPreferences,
  deleteContact: deleteContact,
  searchContacts: searchContacts,
  createContact: createContact,
  addContactChannel: addContactChannel
};