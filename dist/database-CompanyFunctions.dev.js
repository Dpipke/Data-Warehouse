"use strict";

var _require = require("sequelize"),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var _require2 = require('./database-models'),
    Company = _require2.Company;

function getAllCompanies() {
  var companies, allCompanies;
  return regeneratorRuntime.async(function getAllCompanies$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Company.findAll({
            attributes: ['name'],
            foreignKey: 'city',
            include: {
              all: true,
              nested: true,
              required: true
            }
          }));

        case 2:
          companies = _context.sent;
          allCompanies = JSON.stringify(companies);
          console.log(allCompanies);
          return _context.abrupt("return", allCompanies);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  getAllCompanies: getAllCompanies
};