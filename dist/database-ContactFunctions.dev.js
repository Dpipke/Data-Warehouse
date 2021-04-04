"use strict";

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
  var contactsTable;
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
          return _context.abrupt("return", contactsTable);

        case 4:
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

module.exports = {
  getContacts: getContacts,
  getContactChannels: getContactChannels,
  getContactPreferences: getContactPreferences,
  deleteContact: deleteContact
};