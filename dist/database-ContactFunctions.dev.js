"use strict";

var _require = require("sequelize"),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var _require2 = require('./database-models'),
    Contact = _require2.Contact,
    ContactChannel = _require2.ContactChannel,
    ChannelSocialMedia = _require2.ChannelSocialMedia,
    Preference = _require2.Preference;

function getContacts() {
  var contactsTable;
  return regeneratorRuntime.async(function getContacts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Contact.findAll({
            include: {
              all: true,
              nested: true // required: true,

            }
          }));

        case 2:
          contactsTable = _context.sent;
          console.log(contactsTable);

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