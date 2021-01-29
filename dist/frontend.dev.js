"use strict";

var usersLi = document.getElementById('users-li');
var companyLi = document.getElementById('company-li');
var regionLi = document.getElementById('region-li');
var usersSection = document.getElementById('users-section');
var companySection = document.getElementById('company-section');
var regionSection = document.getElementById('region-section');
var usersTable = document.getElementById('users-table');
var companyTable = document.getElementById('company-table');
usersLi.addEventListener('click', function () {
  return openLi(usersSection, 'users', usersTable);
});
companyLi.addEventListener('click', function () {
  return openLi(companySection, 'companies', companyTable);
});
regionLi.addEventListener('click', function () {
  return openLi(regionSection, 'regions');
});

function openLi(liSection, extension, table) {
  liSection.classList.remove('dnone');
  liSection.classList.add('open-section');
  getLocations(liSection, extension, table);
}

function getLocations(liSection, extension, table) {
  var url, response, results;
  return regeneratorRuntime.async(function getLocations$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = "http://localhost:3010/".concat(extension);
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(url));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          results = _context.sent;

          if (liSection === regionSection) {
            renderRegions(results, liSection);
          } else {
            renderTable(results, table);
          }

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

function renderRegions(results, liSection) {
  results.forEach(function (item) {
    console.log(item);
    var p = document.createElement('p');
    p.innerText = item.name;
    liSection.appendChild(p);
    var eachRegionsCountries = item.Countries;
    eachRegionsCountries.forEach(function (item) {
      console.log(item);
    });
  });
}

function renderTable(results, table) {
  results.forEach(function (item) {
    console.log(item);
    var tr = document.createElement('tr');
    tr.id = item.id;
    delete item.id;
    var registerValues = Object.values(item);
    registerValues.forEach(function (register) {
      var td = document.createElement('td');
      td.innerText = register;
      tr.appendChild(td);
      table.appendChild(tr);
    }); // const register = Object.values(item)
    // register.forEach( item => {
    // tr.innerText = register
  }); // });
}