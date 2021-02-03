const contactsLi = document.getElementById('contacts-li')
const usersLi = document.getElementById('users-li')
const companyLi = document.getElementById('company-li')
const regionLi = document.getElementById('region-li')
const usersSection = document.getElementById('users-section')
const companySection = document.getElementById('company-section')
const regionSection = document.getElementById('region-section')
const usersTable = document.getElementById('users-table')
const companyTable = document.getElementById('company-table')

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

function openLi(model, liSection, path, table){
    liSection.classList.remove('dnone')
    liSection.classList.add('open-section')
    getRegisters(liSection, path, table, model)
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
async function addNewRegister(path, dependentOnLocationId){
    const name = newLocation.value
    console.log(dependentOnLocationId)
    const url = `http://localhost:3010/${path}`
    const response = await fetch(url,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({name: name, id: dependentOnLocationId})
    })

}

async function deleteRegister(path, id){
    console.log(path)
    const url = `http://localhost:3010/${path}/${id}`
    const response = await fetch(url, {
        method: "DELETE",
    })

}
function renderRegions(results, liSection){
    const addRegion = document.createElement('a')
    addRegion.innerText = 'Añadir región'
    addRegion.classList = 'locations-buttons addLocation addRegion'
    addRegion.addEventListener('click',() => openAddButton('Region'))
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
        addCountry.addEventListener('click',() => openAddButton('País', regionDiv.id ))
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
            addCity.addEventListener('click',() => openAddButton('Ciudad', countryDiv.id))
            deleteLocationButton.addEventListener('click', () => openDeleteWindow(p.innerText, deleteLocationButton.id))
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
                deleteLocationButton.addEventListener('click', () => openDeleteWindow(p.innerText, deleteLocationButton.id))
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

function openAddButton(model, modelDependentOnId){
    addLocation.classList.remove('dnone')
    addLocation.classList.add('fixed-window')
    addLocationTitle.innerText = `Añadir ${model}`
    if(modelDependentOnId !=null ){
        const id = modelDependentOnId.split(' ')[1]
        const modelDependentOn = modelDependentOnId.split(' ')[0]
        if(modelDependentOn == 'Region'){
            addLocationButton.addEventListener('click', ()=> addNewRegister('countries',  id))
        }
        if(modelDependentOn == 'Country'){
            addLocationButton.addEventListener('click', ()=> addNewRegister('cities',  id))
        }
    }else{
        addLocationButton.addEventListener('click', ()=> addNewRegister('regions',  modelDependentOnId))
    }
}

function openDeleteWindow(place, buttonClickedId){
    const model = buttonClickedId.split(' ')[0]
    const placeId = buttonClickedId.split(' ')[1]
    deleteLocationSection.classList.remove('dnone')
    deleteLocationSection.classList.add('fixed-window')
    locationToDelete.innerText = place +'?'
    console.log(model)
    if(model == 'Region'){
        const path = 'regions'
        yesButton.addEventListener('click', () => deleteRegister(path, placeId))
    }if(model == 'Country'){
        const path = 'countries'
        yesButton.addEventListener('click', () => deleteRegister(path, placeId))
    }if(model == 'City'){
        const path = 'cities'
        yesButton.addEventListener('click', () => deleteRegister(path, placeId))
    }

}
function openCommands(actionsButton, deleteButton, editButton){
    actionsButton.classList.remove('dblock')
    // actionsButton.classList.add('dnone')
    deleteButton.classList.remove('dnone')
    editButton.classList.remove('dnone')

}