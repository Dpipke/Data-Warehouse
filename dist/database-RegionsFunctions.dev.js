"use strict";

var _require = require("sequelize"),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var _require2 = require('./database-models'),
    Region = _require2.Region,
    Country = _require2.Country,
    City = _require2.City;

function getAllLocations() {
  var regionsTable;
  return regeneratorRuntime.async(function getAllLocations$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Region.findAll({
            attributes: ['name'],
            foreignKey: 'RegionId',
            include: {
              all: true,
              nested: true,
              required: true
            }
          }));

        case 2:
          regionsTable = _context.sent;
          console.log(JSON.stringify(regionsTable));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function addNewLocation(model, name) {
  var newRegion, newCountry, newCity;
  return regeneratorRuntime.async(function addNewLocation$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.t0 = model;
          _context2.next = _context2.t0 === 'Region' ? 3 : _context2.t0 === 'Country' ? 8 : _context2.t0 === 'City' ? 13 : 18;
          break;

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(Region.create({
            name: name
          }));

        case 5:
          newRegion = _context2.sent;
          console.log(newRegion);
          return _context2.abrupt("break", 18);

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(Country.create({
            name: name
          }));

        case 10:
          newCountry = _context2.sent;
          console.log(newCity);
          return _context2.abrupt("break", 18);

        case 13:
          _context2.next = 15;
          return regeneratorRuntime.awrap(City.create({
            name: name
          }));

        case 15:
          newCity = _context2.sent;
          console.log(newCity);
          return _context2.abrupt("break", 18);

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  });
}

module.exports = {
  getAllLocations: getAllLocations,
  addNewLocation: addNewLocation
};