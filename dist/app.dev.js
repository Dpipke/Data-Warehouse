"use strict";

var contactsLi = document.getElementById('contacts-li');
var usersLi = document.getElementById('users-li');
var companyLi = document.getElementById('company-li');
var regionLi = document.getElementById('region-li');
var usersSection = document.getElementById('users-section');
var companySection = document.getElementById('company-section');
var regionSection = document.getElementById('region-section');
var contactsSection = document.getElementById('contacts-section');
var usersTable = document.getElementById('users-table');
var companyTable = document.getElementById('company-table');
var contactsTable = document.getElementById('contacts-table');
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
});
contactsLi.addEventListener('click', function () {
  return openLi('Contacts', contactsSection, 'contacts', contactsTable);
});
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
var addCompanyToDBButton = document.getElementById('addCompanyButton');
var cancelAddCompany = document.getElementById('cancelAddCompany');
var postCompanyRegion = document.getElementById('postCompanyRegion');
var postCompanyCountry = document.getElementById('postCompanyCountry');
var postCompanyCity = document.getElementById('postCompanyCity');
var inputCompanyName = document.getElementById('inputCompanyName');
var inputCompanyAddress = document.getElementById('inputCompanyAddress');
var inputCompanyEmail = document.getElementById('inputCompanyEmail');
var inputCompanyTelephone = document.getElementById('inputCompanyTelephone');
var arrowDownSearch = document.getElementById('arrowDownSearch');
var searchOptions = document.getElementById('searchOptions');
arrowDownSearch.addEventListener('click', function () {
  searchOptions.classList.remove('dnone');
  searchOptions.classList.add('searchOptions');
});
var inputContactName = document.getElementById('inputContactName');
var inputContactPosition = document.getElementById('inputContactPosition');
var inputContactLocation = document.getElementById('inputContactLocation');
var inputContactCompany = document.getElementById('inputContactCompany');
var searchLens = document.getElementById('searchLens'); // searchLens.addEventListener('submit', )

addCompanyButton.addEventListener('click', function () {
  return openAddButton('companies', null, addCompanyWindow);
});
cancelAddCompany.addEventListener('click', function () {
  return closeWindow(addCompanyWindow, regionSection);
});
addCompanyToDBButton.addEventListener('click', function () {
  return addNewRegister('companies', {
    name: inputCompanyName.value,
    cityId: postCompanyCity.options[postCompanyCity.selectedIndex].value,
    address: inputCompanyAddress.value,
    email: inputCompanyEmail.value,
    telephone: inputCompanyTelephone.value
  }, null, null, null, null);
});
var addUserButtonOpenWindow = document.getElementById('addUserButton-openWindow');
var addUserWindow = document.getElementById('addUserWindow');
var postUserName = document.getElementById('postUserName');
var postUserLastname = document.getElementById('postUserLastname');
var postUserEmail = document.getElementById('postUserEmail');
var postUserRole = document.getElementById('postUserRole');
var postUserPassword = document.getElementById('postUserPassword');
var postUserRepeatPassword = document.getElementById('postUserRepeatPassword');
var invalidPassword = document.getElementById('invalidPassword');
var cancelAddUser = document.getElementById('cancelAddUser');
var addUserButton = document.getElementById('addUserButton');
var closeAddUserWindow = document.getElementById('closeAddUserWindow');
var closeAddUser = document.getElementById('closeAddUser');
var deleteUserSection = document.getElementById('deleteUserSection');
var userToDelete = document.getElementById('userToDelete');
var deleteUserButton = document.getElementById('deleteUserButton');
var cancelDeleteUser = document.getElementById('cancelDeleteUser');
addUserButtonOpenWindow.addEventListener('click', function () {
  return openAddButton('users', null, addUserWindow);
});
cancelDeleteUser.addEventListener('click', function () {
  return closeWindow(deleteUserSection, usersSection);
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
    var actionsButton = document.createElement('i');
    var editButton = document.createElement('i');
    var deleteButton = document.createElement('i');
    var allButtonsDiv = document.createElement('div');
    var buttonsDiv = document.createElement('div');
    actionsButton.alt = 'action';
    actionsButton.classList = 'fas fa-ellipsis-v';
    deleteButton.alt = 'delete';
    deleteButton.classList = 'fas fa-trash';
    editButton.alt = 'edit';
    editButton.classList = 'fas fa-pen';
    buttonsDiv.classList = 'dnone';
    allButtonsDiv.classList = 'allButtons';
    tr.id = item.id;
    delete item.id;
    actionsButton.addEventListener('click', function () {
      buttonsDiv.classList.remove('dnone');
      buttonsDiv.classList.add('buttonsDiv');
    });
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);
    allButtonsDiv.appendChild(actionsButton);
    allButtonsDiv.appendChild(buttonsDiv);
    deleteButton.addEventListener('click', function () {
      return openCompaniesOrUsersWindow('delete', item.name + " " + item.lastname, tr.id, deleteUserSection, usersSection, buttonsDiv);
    });
    editButton.addEventListener('click', function () {
      return openCompaniesOrUsersWindow();
    });
    var registerValues = Object.values(item);
    registerValues.forEach(function (register) {
      var td = document.createElement('td');
      td.innerText = register;
      tr.appendChild(td);
      tr.appendChild(allButtonsDiv);
      table.appendChild(tr);
    });
  });
}

function openAddButton(model, modelDependentOnId, window) {
  var id, modelDependentOn, locationBody;
  return regeneratorRuntime.async(function openAddButton$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          window.classList.remove('dnone');
          window.classList.add('fixed-window');

          if (window == addCompanyWindow) {
            window.classList.add('addCompanyWindow');
          }

          addLocationTitle.innerText = "A\xF1adir ".concat(model);

          if (modelDependentOnId != null) {
            id = modelDependentOnId.split(' ')[1];
            modelDependentOn = modelDependentOnId.split(' ')[0];
            locationBody = {
              name: newLocation.value,
              id: id
            };

            if (modelDependentOn == 'Region') {
              addLocationButton.addEventListener('click', function () {
                return addNewRegister('countries', {
                  name: newLocation.value,
                  id: id
                });
              });
            }

            if (modelDependentOn == 'Country') {
              addLocationButton.addEventListener('click', function () {
                return addNewRegister('cities', {
                  name: newLocation.value,
                  id: id
                });
              });
            }
          } else {
            addLocationButton.addEventListener('click', function () {
              return addNewRegister('regions', {
                name: newLocation.value
              });
            });

            if (postUserPassword.value == postUserRepeatPassword.value) {
              addUserButton.addEventListener('click', function () {
                var userBody = {
                  name: postUserName.value,
                  lastname: postUserLastname.value,
                  email: postUserEmail.value,
                  password: postUserPassword.value,
                  role: postUserRole.value
                };
                addNewRegister('users', userBody, addUserWindow, usersSection, closeAddUserWindow, closeAddUser);
              });

              if (window == addCompanyWindow) {
                assignRegionToForm();
                changeCountry();
                addCompanyButton.addEventListener('click', function () {});
              } else {
                invalidPassword.classList.remove('dnone');
                invalidPassword.classList.add('warning');
              }
            }
          }

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
}

var userLogin = document.getElementById('userLogin');
var passwordLogin = document.getElementById('passwordLogin');
var loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', function _callee() {
  var userLoginValue, passwordLoginValue, url, response, resultsStatus;
  return regeneratorRuntime.async(function _callee$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          userLoginValue = userLogin.value;
          passwordLoginValue = passwordLogin.value;
          url = "http://localhost:3010/login";
          _context6.next = 5;
          return regeneratorRuntime.awrap(fetch(url, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
              user: userLoginValue,
              password: passwordLoginValue
            })
          }));

        case 5:
          response = _context6.sent;
          _context6.next = 8;
          return regeneratorRuntime.awrap(response.status);

        case 8:
          resultsStatus = _context6.sent;
          console.log(resultsStatus);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  });
});

function openWindow(method, registerToDelete, buttonClickedId, section) {
  var model = buttonClickedId.split(' ')[0];
  var placeId = buttonClickedId.split(' ')[1];
  locationToDelete.innerText = registerToDelete + '?';
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

function openCompaniesOrUsersWindow(db, method, registerToDelete, buttonClickedId, window, section, buttonsDiv) {
  window.classList.remove('dnone');
  window.classList.add('fixed-window');
  buttonsDiv.classList = "";
  buttonsDiv.classList.add('dnone');
  userToDelete.innerText = registerToDelete + " de la base de datos de usuarios?";
  deleteUserButton.addEventListener('click', function () {
    deleteRegister('users', buttonClickedId), closeWindow(window, section);
  });
}

function closeWindow(window, mainSection) {
  window.className = "";
  window.classList.add('dnone'); // mainSection.innerHTML = ""
  // ver como recargar la pagin
}

function getLocations() {
  var url, response, results;
  return regeneratorRuntime.async(function getLocations$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          url = "http://localhost:3010/regions";
          _context7.next = 3;
          return regeneratorRuntime.awrap(fetch(url));

        case 3:
          response = _context7.sent;
          _context7.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          results = _context7.sent;
          return _context7.abrupt("return", results);

        case 8:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function assignRegionToForm() {
  var allLocations;
  return regeneratorRuntime.async(function assignRegionToForm$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(getLocations());

        case 2:
          allLocations = _context8.sent;
          allLocations.forEach(function (region) {
            var option = document.createElement('option');
            option.innerText = region.regionName;
            option.id = region.regionId;
            option.value = region.regionId;
            postCompanyRegion.appendChild(option);
          });

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
}

function changeCountry() {
  return regeneratorRuntime.async(function changeCountry$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          postCompanyRegion.addEventListener('change', function _callee3(event) {
            var chosenRegionId, url, response, results;
            return regeneratorRuntime.async(function _callee3$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    chosenRegionId = postCompanyRegion.options[postCompanyRegion.selectedIndex].value;
                    url = "http://localhost:3010/countries/".concat(chosenRegionId);
                    _context10.next = 4;
                    return regeneratorRuntime.awrap(fetch(url));

                  case 4:
                    response = _context10.sent;
                    _context10.next = 7;
                    return regeneratorRuntime.awrap(response.json());

                  case 7:
                    results = _context10.sent;
                    results.forEach(function (country) {
                      var option = document.createElement('option');
                      option.innerText = country.countryName;
                      option.id = country.countryId;
                      option.value = country.countryId;
                      postCompanyCountry.appendChild(option);
                      postCompanyCountry.addEventListener('change', function _callee2(event) {
                        var chosenCountryId, cityUrl, cityResponse, cityResults;
                        return regeneratorRuntime.async(function _callee2$(_context9) {
                          while (1) {
                            switch (_context9.prev = _context9.next) {
                              case 0:
                                chosenCountryId = postCompanyCountry.options[postCompanyCountry.selectedIndex].value;
                                cityUrl = "http://localhost:3010/cities/".concat(chosenCountryId);
                                _context9.next = 4;
                                return regeneratorRuntime.awrap(fetch(cityUrl));

                              case 4:
                                cityResponse = _context9.sent;
                                _context9.next = 7;
                                return regeneratorRuntime.awrap(cityResponse.json());

                              case 7:
                                cityResults = _context9.sent;
                                console.log(cityResults);
                                cityResults.forEach(function (city) {
                                  var option = document.createElement('option');
                                  option.innerText = city.cityName;
                                  option.id = city.cityId;
                                  option.value = city.cityId;
                                  postCompanyCity.appendChild(option);
                                });

                              case 10:
                              case "end":
                                return _context9.stop();
                            }
                          }
                        });
                      });
                    });

                  case 9:
                  case "end":
                    return _context10.stop();
                }
              }
            });
          });

        case 1:
        case "end":
          return _context11.stop();
      }
    }
  });
}