"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require("sequelize"),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var _require2 = require('./database-models'),
    Contact = _require2.Contact,
    ContactChannel = _require2.ContactChannel,
    ChannelSocialMedia = _require2.ChannelSocialMedia,
    Preference = _require2.Preference,
    Company = _require2.Company;

function getContacts() {
  var _Contact$findAll;

  var contactsTable;
  return regeneratorRuntime.async(function getContacts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Contact.findAll((_Contact$findAll = {
            include: {
              all: true,
              nested: true
            }
          }, _defineProperty(_Contact$findAll, "include", {
            model: Company
          }), _defineProperty(_Contact$findAll, "include", {
            model: ContactChannel,
            include: {
              all: true,
              nested: true
            } // include:{
            //     model: ChannelSocialMedia
            // },
            // include:{
            //     model: Preference
            // }

          }), _Contact$findAll)));

        case 2:
          contactsTable = _context.sent;
          return _context.abrupt("return", contactsTable);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  getContacts: getContacts
};