const contactsLi = document.getElementById('contacts-li')
const usersLi = document.getElementById('users-li')
const companyLi = document.getElementById('company-li')
const regionLi = document.getElementById('region-li')
const usersSection = document.getElementById('users-section')
const companySection = document.getElementById('company-section')
const regionSection = document.getElementById('region-section')
const usersTable = document.getElementById('users-table')
const companyTable = document.getElementById('company-table')

const updateLocationSection = document.getElementById('update-location')
const deleteLocationSection = document.getElementById('delete-location')
const locationToDelete = document.getElementById('locationToDelete')
const addLocation = document.getElementById('add-location')
const addLocationButton = document.getElementById('add-location-button')
const newLocation = document.getElementById('input-new-location')
const addLocationTitle = document.getElementById('addLocation-title')
usersLi.addEventListener('click', () => openLi('User', usersSection, 'users', usersTable))
companyLi.addEventListener('click', () => openLi('Company', companySection, 'companies', companyTable))
regionLi.addEventListener('click', () => openLi('Region', regionSection, 'regions'))
// contactsLi.addEventListener('click', () => openLi())

const yesButton=  document.getElementById('yesButton')
const noButton = document.getElementById('noButton')
const cancelUpdateLocation = document.getElementById('cancel-update-section')
const updateLocationButton = document.getElementById('update-location-button')
const inputLocationToUpdate = document.getElementById('inputlocationToUpdate')
cancelUpdateLocation.addEventListener('click', ()=> closeWindow(updateLocationSection, regionSection))

const addCompanyWindow = document.getElementById('addCompanyWindow')
const addCompanyButton = document.getElementById('addCompanyButton-openWindow')
const cancelAddCompany = document.getElementById('cancelAddCompany')

addCompanyButton.addEventListener('click', ()=>openAddButton('companies', null,addCompanyWindow ))
cancelAddCompany.addEventListener('click', ()=> closeWindow(addCompanyWindow, regionSection))

const addUserButtonOpenWindow = document.getElementById('addUserButton-openWindow')
const addUserWindow = document.getElementById('addUserWindow')
const postUserName = document.getElementById('postUserName')
const postUserLastname = document.getElementById('postUserLastname')
const postUserEmail = document.getElementById('postUserEmail')
const postUserRole = document.getElementById('postUserRole')
const cancelAddUser = document.getElementById('cancelAddUser')
const addUserButton = document.getElementById('addUserButton')
const closeAddUserWindow = document.getElementById('closeAddUserWindow')
const closeAddUser = document.getElementById('closeAddUser')
addUserButtonOpenWindow.addEventListener('click', ()=> openAddButton('users', null, addUserWindow))

function openLi(model, liSection, path, table){
    if(liSection.classList == 'dnone'){
        liSection.classList.remove('dnone')
        liSection.classList.add('open-section')
    getRegisters(liSection, path, table, model)
    }else{
        liSection.classList.add('dnone')
    }
}
async function getRegisters(liSection, path, table, model){
    const url = `http://localhost:3010/${path}`
    const response = await fetch(url)
    const results = await response.json()
    if(liSection=== regionSection){
        renderRegions(results, liSection)
    }else{
        renderTable(results, table, path, model ) 
    }
}
async function addNewRegister(path,  body, window, mainSection, successWindow, closeButton){
    console.log(body)
    const url = `http://localhost:3010/${path}`
    const response = await fetch(url,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({body})
    })
    const resultsStatus = await response.status
    if(resultsStatus === 201){
        window.classList.remove('fixed-window')
        window.classList.add('dnone')
        successWindow.classList.remove('dnone')
        successWindow.classList.add('fixed-window')
        successWindow.classList.add('sucessfullyCreated')
        closeButton.addEventListener('click', () => {
            closeWindow(window, mainSection)
        })
    }
}

async function deleteRegister(path, id){
    console.log(path)
    const url = `http://localhost:3010/${path}/${id}`
    const response = await fetch(url, {
        method: "DELETE",
    })

}
async function updateRegister(updatedInformation, path, id){
    const url = `http://localhost:3010/${path}/${id}`
    console.log(url)
    const response = await fetch(url,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({name: updatedInformation})
    })
    
}
function renderRegions(results, liSection){
    const addRegion = document.createElement('a')
    addRegion.innerText = 'Añadir región'
    addRegion.classList = 'locations-buttons addLocation addRegion'
    addRegion.addEventListener('click',() => openAddButton('Region', null, addLocation))
    regionSection.appendChild(addRegion)
    results.forEach(item => {
        const regionDiv = document.createElement('div')
        const p = document.createElement('p')
        const addCountry = document.createElement('a')
        p.innerText = item.regionName
        p.id = item.regionId
        p.classList = 'eachRegion'
        regionDiv.id = 'Region '+ item.regionId
        addCountry.innerText = 'Añadir país'
        addCountry.classList = 'locations-buttons addLocation addCountry'
        addCountry.addEventListener('click',() => openAddButton('País', regionDiv.id, addLocation ))
        addCountry.id = 'buttonDependentOnRegionId '+ item.regionId
        regionDiv.appendChild(addCountry)
        regionDiv.appendChild(p)
        liSection.appendChild(regionDiv)
        const eachRegionsCountries = item.countries
        eachRegionsCountries.forEach(item =>{
            const countryDiv = document.createElement('div')
            const p = document.createElement('p')
            const addCity = document.createElement('a')
            const editLocationButton = document.createElement('a')
            const deleteLocationButton = document.createElement('a')
            p.innerText = item.countryName
            p.id = item.countryId
            p.classList = 'eachCountry'
            countryDiv.id = 'Country '+ item.countryId
            addCity.innerText = 'Añadir ciudad'
            addCity.classList = 'locations-buttons addLocation addCity'
            addCity.id = 'buttonDependentOnCountryId '+ item.countryId
            addCity.addEventListener('click',() => openAddButton('Ciudad', countryDiv.id, addLocation))
            deleteLocationButton.addEventListener('click', () => openWindow('delete',p.innerText, deleteLocationButton.id, deleteLocationSection))
            editLocationButton.addEventListener('click', () => openWindow('update', p.innerText, editLocationButton.id, updateLocationSection))
            editLocationButton.id = 'Country '+ item.countryId
            deleteLocationButton.id = 'Country '+ item.countryId
            editLocationButton.innerText = 'Editar'
            deleteLocationButton.innerText = 'Eliminar'
            editLocationButton.classList = 'locations-buttons editLocation'
            deleteLocationButton.classList = 'locations-buttons deleteLocation'
            countryDiv.appendChild(editLocationButton)
            countryDiv.appendChild(deleteLocationButton)
            countryDiv.appendChild(addCity)
            countryDiv.appendChild(p)
            regionDiv.appendChild(countryDiv)
            const eachCountryCities = item.cities
            eachCountryCities.forEach(item =>{
                const p = document.createElement('p')
                const editLocationButton = document.createElement('a')
                const deleteLocationButton = document.createElement('a')
                p.innerText = item.cityName
                p.id = item.cityId
                p.classList = 'eachCity'
                editLocationButton.innerText = 'Editar'
                deleteLocationButton.innerText = 'Eliminar'
                editLocationButton.id = 'City '+ item.cityId
                deleteLocationButton.id = 'City '+ item.cityId
                editLocationButton.classList = 'locations-buttons editLocation editCity'
                deleteLocationButton.classList = 'locations-buttons deleteLocation deleteCity'
                deleteLocationButton.addEventListener('click', () => openWindow('delete', p.innerText, deleteLocationButton.id, deleteLocationSection))
                editLocationButton.addEventListener('click', () => openWindow('update', p.innerText, editLocationButton.id, updateLocationSection))
                countryDiv.appendChild(editLocationButton)
                countryDiv.appendChild(deleteLocationButton)
                countryDiv.appendChild(p)
                })
        })
    })
}

function renderTable(results, table, path, model){
    results.forEach(item => {
    console.log(item)
    const tr = document.createElement('tr')
    const actionsButton = document.createElement('img')
    const editButton = document.createElement('img')
    const deleteButton = document.createElement('img')
    actionsButton.src = ''
    actionsButton.alt = 'action'
    actionsButton.classList = 'dblock'
    deleteButton.src = ''
    deleteButton.alt = 'delete'
    deleteButton.classList = 'dnone'
    editButton.src = ''
    editButton.alt = 'edit'
    editButton.classList = 'dnone'
    tr.id = item.id
    delete item.id
    actionsButton.addEventListener('click', () => openCommands(actionsButton, deleteButton, editButton))
    deleteButton.addEventListener('click', () =>  deleteRegister(path, tr.id))
    // editButton.addEventListener('click', )
    const registerValues = Object.values(item)
    registerValues.forEach( register =>{
        const td = document.createElement('td')
        td.innerText = register   
        tr.appendChild(td)
        tr.appendChild(actionsButton)
        tr.appendChild(deleteButton)
        tr.appendChild(editButton)
        table.appendChild(tr)
    })
    })
}

function openAddButton(model, modelDependentOnId, window){
    window.classList.remove('dnone')
    window.classList.add('fixed-window')
    if(window == addCompanyWindow){
        window.classList.add('addCompanyWindow')
    }
    addLocationTitle.innerText = `Añadir ${model}`
    if(modelDependentOnId !=null ){
        const id = modelDependentOnId.split(' ')[1]
        const modelDependentOn = modelDependentOnId.split(' ')[0]
        const locationBody ={
            name: newLocation.value,
            id: id
        }
        if(modelDependentOn == 'Region'){
            addLocationButton.addEventListener('click', ()=> addNewRegister('countries', locationBody))
        }
        if(modelDependentOn == 'Country'){
            addLocationButton.addEventListener('click', ()=> addNewRegister('cities', locationBody))
        }
    }else{
        const locationBody ={
            name: newLocation.value
        }
        addLocationButton.addEventListener('click', ()=> addNewRegister('regions', locationBody))
        addUserButton.addEventListener('click', () => {
            const userBody = {
                name: postUserName.value,
                lastname: postUserLastname.value,
                email: postUserEmail.value,
                role: postUserRole.value
            }
            addNewRegister('users', userBody, addUserWindow, usersSection, closeAddUserWindow, closeAddUser)})
    }
}

function openWindow(method, place, buttonClickedId, section){
    const model = buttonClickedId.split(' ')[0]
    const placeId = buttonClickedId.split(' ')[1]
    section.classList.remove('dnone')
    section.classList.add('fixed-window')
    locationToDelete.innerText = place +'?'
    console.log(model)
    console.log(placeId)
    if(method == 'update'){
        switch(model){
            case 'Region':
                updateLocationButton.addEventListener('click', ()=>updateRegister(inputLocationToUpdate.value, 'regions', placeId))
            break;
            case 'Country':
                updateLocationButton.addEventListener('click', ()=>updateRegister(inputLocationToUpdate.value, 'countries', placeId))
            break;
            case 'City':
                updateLocationButton.addEventListener('click', ()=>updateRegister(inputLocationToUpdate.value, 'cities', placeId))
            break;
        }

    }if(method == 'delete'){
        if(model == 'Region'){
            const path = 'regions'
            yesButton.addEventListener('click', () => {
                deleteRegister(path, placeId), closeWindow(deleteLocationSection, regionSection, 'regions', 'Region', )})
        }if(model == 'Country'){
            const path = 'countries'
            yesButton.addEventListener('click', () => {
                deleteRegister(path, placeId), closeWindow(deleteLocationSection, regionSection, 'regions', 'Region')})
        }if(model == 'City'){
            const path = 'cities'
            yesButton.addEventListener('click', () => {
                deleteRegister(path, placeId), closeWindow(deleteLocationSection, regionSection, 'regions',  'Region')})
        }

}
}
function openCommands(actionsButton, deleteButton, editButton){
    actionsButton.classList.remove('dblock')
    // actionsButton.classList.add('dnone')
    deleteButton.classList.remove('dnone')
    editButton.classList.remove('dnone')

}

function closeWindow(window, mainSection){
    window.className = ""
    window.classList.add('dnone')
    // mainSection.innerHTML = ""
    // ver como recargar la pagin
}