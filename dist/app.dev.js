"use strict";

var contactsLi = document.getElementById('contacts-li');
var usersLi = document.getElementById('users-li');
var companyLi = document.getElementById('company-li');
var regionLi = document.getElementById('region-li');
var usersSection = document.getElementById('users-section');
var companySection = document.getElementById('company-section');
var regionSection = document.getElementById('region-section');
var usersTable = document.getElementById('users-table');
var companyTable = document.getElementById('company-table');
var updateLocationSection = document.getElementById('update-location');
var deleteLocationSection = document.getElementById('delete-location');
var locationToDelete = document.getElementById('locationToDelete');
var addLocation = document.getElementById('add-location');
var addLocationButton = document.getElementById('add-location-button');
var newLocation = document.getElementById('input-new-location');
var addLocationTitle = document.getElementById('addLocation-title');
usersLi.addEventListener('click', function () {
  return openLi('User', usersSection, 'users', usersTable);
});
companyLi.addEventListener('click', function () {
  return openLi('Company', companySection, 'companies', companyTable);
});
regionLi.addEventListener('click', function () {
  return openLi('Region', regionSection, 'regions');
}); // contactsLi.addEventListener('click', () => openLi())

var yesButton = document.getElementById('yesButton');
var noButton = document.getElementById('noButton');
var cancelUpdateLocation = document.getElementById('cancel-update-section');
var updateLocationButton = document.getElementById('update-location-button');
var inputLocationToUpdate = document.getElementById('inputlocationToUpdate');
cancelUpdateLocation.addEventListener('click', function () {
  return closeWindow(updateLocationSection, regionSection);
});
var addCompanyWindow = document.getElementById('addCompanyWindow');
var addCompanyButton = document.getElementById('addCompanyButton-openWindow');
var cancelAddCompany = document.getElementById('cancelAddCompany');
addCompanyButton.addEventListener('click', function () {
  return openAddButton('companies', null, addCompanyWindow);
});
cancelAddCompany.addEventListener('click', function () {
  return closeWindow(addCompanyWindow, regionSection);
});
var addUserButtonOpenWindow = document.getElementById('addUserButton-openWindow');
var addUserWindow = document.getElementById('addUserWindow');
var postUserName = document.getElementById('postUserName');
var postUserLastname = document.getElementById('postUserLastname');
var postUserEmail = document.getElementById('postUserEmail');
var postUserRole = document.getElementById('postUserRole');
var cancelAddUser = document.getElementById('cancelAddUser');
var addUserButton = document.getElementById('addUserButton');
var closeAddUserWindow = document.getElementById('closeAddUserWindow');
var closeAddUser = document.getElementById('closeAddUser');
addUserButtonOpenWindow.addEventListener('click', function () {
  return openAddButton('users', null, addUserWindow);
});

function openLi(model, liSection, path, table) {
  if (liSection.classList == 'dnone') {
    liSection.classList.remove('dnone');
    liSection.classList.add('open-section');
    getRegisters(liSection, path, table, model);
  } else {
    liSection.classList.add('dnone');
  }
}

function getRegisters(liSection, path, table, model) {
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
            renderTable(results, table, path, model);
          }

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

function addNewRegister(path, body, window, mainSection, successWindow, closeButton) {
  var url, response, resultsStatus;
  return regeneratorRuntime.async(function addNewRegister$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(body);
          url = "http://localhost:3010/".concat(path);
          _context2.next = 4;
          return regeneratorRuntime.awrap(fetch(url, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
              body: body
            })
          }));

        case 4:
          response = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(response.status);

        case 7:
          resultsStatus = _context2.sent;

          if (resultsStatus === 201) {
            window.classList.remove('fixed-window');
            window.classList.add('dnone');
            successWindow.classList.remove('dnone');
            successWindow.classList.add('fixed-window');
            successWindow.classList.add('sucessfullyCreated');
            closeButton.addEventListener('click', function () {
              closeWindow(window, mainSection);
            });
          }

        case 9:
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
          console.log(path);
          url = "http://localhost:3010/".concat(path, "/").concat(id);
          _context3.next = 4;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "DELETE"
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

function updateRegister(updatedInformation, path, id) {
  var url, response;
  return regeneratorRuntime.async(function updateRegister$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          url = "http://localhost:3010/".concat(path, "/").concat(id);
          console.log(url);
          _context4.next = 4;
          return regeneratorRuntime.awrap(fetch(url, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
              name: updatedInformation
            })
          }));

        case 4:
          response = _context4.sent;

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function renderRegions(results, liSection) {
  var addRegion = document.createElement('a');
  addRegion.innerText = 'Añadir región';
  addRegion.classList = 'locations-buttons addLocation addRegion';
  addRegion.addEventListener('click', function () {
    return openAddButton('Region', null, addLocation);
  });
  regionSection.appendChild(addRegion);
  results.forEach(function (item) {
    var regionDiv = document.createElement('div');
    var p = document.createElement('p');
    var addCountry = document.createElement('a');
    p.innerText = item.regionName;
    p.id = item.regionId;
    p.classList = 'eachRegion';
    regionDiv.id = 'Region ' + item.regionId;
    addCountry.innerText = 'Añadir país';
    addCountry.classList = 'locations-buttons addLocation addCountry';
    addCountry.addEventListener('click', function () {
      return openAddButton('País', regionDiv.id, addLocation);
    });
    addCountry.id = 'buttonDependentOnRegionId ' + item.regionId;
    regionDiv.appendChild(addCountry);
    regionDiv.appendChild(p);
    liSection.appendChild(regionDiv);
    var eachRegionsCountries = item.countries;
    eachRegionsCountries.forEach(function (item) {
      var countryDiv = document.createElement('div');
      var p = document.createElement('p');
      var addCity = document.createElement('a');
      var editLocationButton = document.createElement('a');
      var deleteLocationButton = document.createElement('a');
      p.innerText = item.countryName;
      p.id = item.countryId;
      p.classList = 'eachCountry';
      countryDiv.id = 'Country ' + item.countryId;
      addCity.innerText = 'Añadir ciudad';
      addCity.classList = 'locations-buttons addLocation addCity';
      addCity.id = 'buttonDependentOnCountryId ' + item.countryId;
      addCity.addEventListener('click', function () {
        return openAddButton('Ciudad', countryDiv.id, addLocation);
      });
      deleteLocationButton.addEventListener('click', function () {
        return openWindow('delete', p.innerText, deleteLocationButton.id, deleteLocationSection);
      });
      editLocationButton.addEventListener('click', function () {
        return openWindow('update', p.innerText, editLocationButton.id, updateLocationSection);
      });
      editLocationButton.id = 'Country ' + item.countryId;
      deleteLocationButton.id = 'Country ' + item.countryId;
      editLocationButton.innerText = 'Editar';
      deleteLocationButton.innerText = 'Eliminar';
      editLocationButton.classList = 'locations-buttons editLocation';
      deleteLocationButton.classList = 'locations-buttons deleteLocation';
      countryDiv.appendChild(editLocationButton);
      countryDiv.appendChild(deleteLocationButton);
      countryDiv.appendChild(addCity);
      countryDiv.appendChild(p);
      regionDiv.appendChild(countryDiv);
      var eachCountryCities = item.cities;
      eachCountryCities.forEach(function (item) {
        var p = document.createElement('p');
        var editLocationButton = document.createElement('a');
        var deleteLocationButton = document.createElement('a');
        p.innerText = item.cityName;
        p.id = item.cityId;
        p.classList = 'eachCity';
        editLocationButton.innerText = 'Editar';
        deleteLocationButton.innerText = 'Eliminar';
        editLocationButton.id = 'City ' + item.cityId;
        deleteLocationButton.id = 'City ' + item.cityId;
        editLocationButton.classList = 'locations-buttons editLocation editCity';
        deleteLocationButton.classList = 'locations-buttons deleteLocation deleteCity';
        deleteLocationButton.addEventListener('click', function () {
          return openWindow('delete', p.innerText, deleteLocationButton.id, deleteLocationSection);
        });
        editLocationButton.addEventListener('click', function () {
          return openWindow('update', p.innerText, editLocationButton.id, updateLocationSection);
        });
        countryDiv.appendChild(editLocationButton);
        countryDiv.appendChild(deleteLocationButton);
        countryDiv.appendChild(p);
      });
    });
  });
}

function renderTable(results, table, path, model) {
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

function openAddButton(model, modelDependentOnId, window) {
  window.classList.remove('dnone');
  window.classList.add('fixed-window');

  if (window == addCompanyWindow) {
    window.classList.add('addCompanyWindow');
  }

  addLocationTitle.innerText = "A\xF1adir ".concat(model);

  if (modelDependentOnId != null) {
    var id = modelDependentOnId.split(' ')[1];
    var modelDependentOn = modelDependentOnId.split(' ')[0];
    var locationBody = {
      name: newLocation.value,
      id: id
    };

    if (modelDependentOn == 'Region') {
      addLocationButton.addEventListener('click', function () {
        return addNewRegister('countries', locationBody);
      });
    }

    if (modelDependentOn == 'Country') {
      addLocationButton.addEventListener('click', function () {
        return addNewRegister('cities', locationBody);
      });
    }
  } else {
    var _locationBody = {
      name: newLocation.value
    };
    addLocationButton.addEventListener('click', function () {
      return addNewRegister('regions', _locationBody);
    });
    addUserButton.addEventListener('click', function () {
      var userBody = {
        name: postUserName.value,
        lastname: postUserLastname.value,
        email: postUserEmail.value,
        role: postUserRole.value
      };
      addNewRegister('users', userBody, addUserWindow, usersSection, closeAddUserWindow, closeAddUser);
    });
  }
}

function openWindow(method, place, buttonClickedId, section) {
  var model = buttonClickedId.split(' ')[0];
  var placeId = buttonClickedId.split(' ')[1];
  section.classList.remove('dnone');
  section.classList.add('fixed-window');
  locationToDelete.innerText = place + '?';
  console.log(model);
  console.log(placeId);

  if (method == 'update') {
    switch (model) {
      case 'Region':
        updateLocationButton.addEventListener('click', function () {
          return updateRegister(inputLocationToUpdate.value, 'regions', placeId);
        });
        break;

      case 'Country':
        updateLocationButton.addEventListener('click', function () {
          return updateRegister(inputLocationToUpdate.value, 'countries', placeId);
        });
        break;

      case 'City':
        updateLocationButton.addEventListener('click', function () {
          return updateRegister(inputLocationToUpdate.value, 'cities', placeId);
        });
        break;
    }
  }

  if (method == 'delete') {
    if (model == 'Region') {
      var path = 'regions';
      yesButton.addEventListener('click', function () {
        deleteRegister(path, placeId), closeWindow(deleteLocationSection, regionSection, 'regions', 'Region');
      });
    }

    if (model == 'Country') {
      var _path = 'countries';
      yesButton.addEventListener('click', function () {
        deleteRegister(_path, placeId), closeWindow(deleteLocationSection, regionSection, 'regions', 'Region');
      });
    }

    if (model == 'City') {
      var _path2 = 'cities';
      yesButton.addEventListener('click', function () {
        deleteRegister(_path2, placeId), closeWindow(deleteLocationSection, regionSection, 'regions', 'Region');
      });
    }
  }
}

function openCommands(actionsButton, deleteButton, editButton) {
  actionsButton.classList.remove('dblock'); // actionsButton.classList.add('dnone')

  deleteButton.classList.remove('dnone');
  editButton.classList.remove('dnone');
}

function closeWindow(window, mainSection) {
  window.className = "";
  window.classList.add('dnone'); // mainSection.innerHTML = ""
  // ver como recargar la pagin
}