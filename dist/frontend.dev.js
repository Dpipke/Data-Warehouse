"use strict";

var usersLi = document.getElementById('users-li');
var companyLi = document.getElementById('company-li');
var regionLi = document.getElementById('region-li');
var usersSection = document.getElementById('users-section');
var companySection = document.getElementById('company-section');
var regionSection = document.getElementById('region-section');
var usersTable = document.getElementById('users-table');
var companyTable = document.getElementById('company-table');
var addLocation = document.getElementById('add-location');
var addLocationButton = document.getElementById('add-location-button');
var model = document.getElementById('model');
var newLocation = document.getElementById('input-new-location');
var addLocationTitle = document.getElementById('addLocation-title');
usersLi.addEventListener('click', function () {
  return openLi(usersSection, 'users', usersTable);
});
companyLi.addEventListener('click', function () {
  return openLi(companySection, 'companies', companyTable);
});
regionLi.addEventListener('click', function () {
  return openLi(regionSection, 'regions');
});
addLocationButton.addEventListener('click', function () {
  return addNewRegister('regions', addLocationButton.id);
});

function openLi(liSection, path, table) {
  liSection.classList.remove('dnone');
  liSection.classList.add('open-section');
  getRegisters(liSection, path, table);
}

function getRegisters(liSection, path, table) {
  var url, response, results;
  return regeneratorRuntime.async(function getRegisters$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = "http://localhost:3010/".concat(path);
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
            renderTable(results, table, path);
          }

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

function addNewRegister(path, buttonId) {
  var model, name, id, url, response;
  return regeneratorRuntime.async(function addNewRegister$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          model = model.input;
          name = newLocation.input;
          id = buttonId;
          console.log(model.input, newLocation, id);
          url = "http://localhost:3010/".concat(path);
          _context2.next = 7;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "POST",
            body: {
              model: model,
              name: name,
              id: id
            }
          }));

        case 7:
          response = _context2.sent;

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function deleteRegister(path, id) {
  var url, response;
  return regeneratorRuntime.async(function deleteRegister$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(id); // const formData = new FormData()
          // formData.append('id', id)

          url = "http://localhost:3010/".concat(path);
          _context3.next = 4;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "DELETE",
            body: {
              id: id
            }
          }));

        case 4:
          response = _context3.sent;

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function renderRegions(results, liSection) {
  var addRegion = document.createElement('a');
  addRegion.innerText = 'Añadir región';
  addRegion.classList = 'add-locations-buttons';
  addRegion.addEventListener('click', function () {
    return openAddButton('Región');
  });
  regionSection.appendChild(addRegion);
  results.forEach(function (item) {
    console.log(item);
    var regionDiv = document.createElement('div');
    var p = document.createElement('p');
    var addCountry = document.createElement('a');
    p.innerText = item.name;
    p.id = item.Countries[0].RegionId;
    regionDiv.id = 'RegionId ' + item.Countries[0].RegionId;
    addCountry.innerText = 'Añadir país';
    addCountry.classList = 'add-locations-buttons';
    addCountry.addEventListener('click', function () {
      return openAddButton('País');
    });
    addCountry.id = 'buttonDependentOnRegionId ' + item.Countries[0].RegionId;
    regionDiv.appendChild(addCountry);
    regionDiv.appendChild(p);
    liSection.appendChild(regionDiv);
    var eachRegionsCountries = item.Countries;
    eachRegionsCountries.forEach(function (item) {
      var countryDiv = document.createElement('div');
      var p = document.createElement('p');
      var addCity = document.createElement('a');
      p.innerText = item.name;
      p.id = item.id;
      countryDiv.id = 'CountryId ' + item.id;
      addCity.innerText = 'Añadir ciudad';
      addCity.classList = 'add-locations-buttons';
      addCity.id = 'buttonDependentOnCountryId ' + item.id;
      addCity.addEventListener('click', function () {
        return openAddButton('Ciudad');
      });
      regionDiv.appendChild(addCity);
      countryDiv.appendChild(p);
      regionDiv.appendChild(countryDiv);
      var eachCountryCities = item.Cities;
      eachCountryCities.forEach(function (item) {
        var p = document.createElement('p');
        p.innerText = item.name;
        p.id = item.id;
        countryDiv.appendChild(p);
      });
    });
  });
}

function renderTable(results, table, path) {
  results.forEach(function (item) {
    console.log(item);
    var tr = document.createElement('tr');
    var actionsButton = document.createElement('img');
    var editButton = document.createElement('img');
    var deleteButton = document.createElement('img');
    actionsButton.src = '';
    actionsButton.alt = 'action';
    actionsButton.classList = 'dblock';
    deleteButton.src = '';
    deleteButton.alt = 'delete';
    deleteButton.classList = 'dnone';
    editButton.src = '';
    editButton.alt = 'edit';
    editButton.classList = 'dnone';
    tr.id = item.id;
    delete item.id;
    actionsButton.addEventListener('click', function () {
      return openCommands(actionsButton, deleteButton, editButton);
    });
    deleteButton.addEventListener('click', function () {
      return deleteRegister(path, tr.id);
    }); // editButton.addEventListener('click', )

    var registerValues = Object.values(item);
    registerValues.forEach(function (register) {
      var td = document.createElement('td');
      td.innerText = register;
      tr.appendChild(td);
      tr.appendChild(actionsButton);
      tr.appendChild(deleteButton);
      tr.appendChild(editButton);
      table.appendChild(tr);
    });
  });
}

function openAddButton(model) {
  addLocation.classList.remove('dnone');
  addLocation.classList.add('add-register');
  addLocationTitle.innerText = "A\xF1adir ".concat(model);
}

function openCommands(actionsButton, deleteButton, editButton) {
  actionsButton.classList.remove('dblock'); // actionsButton.classList.add('dnone')

  deleteButton.classList.remove('dnone');
  editButton.classList.remove('dnone');
}