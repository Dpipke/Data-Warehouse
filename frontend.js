const usersLi = document.getElementById('users-li')
const companyLi = document.getElementById('company-li')
const regionLi = document.getElementById('region-li')
const usersSection = document.getElementById('users-section')
const companySection = document.getElementById('company-section')
const regionSection = document.getElementById('region-section')
const usersTable = document.getElementById('users-table')
const companyTable = document.getElementById('company-table')

const addLocation = document.getElementById('add-location')
const addLocationButton = document.getElementById('add-location-button')
const model = document.getElementById('model')
const newLocation = document.getElementById('input-new-location')
const addLocationTitle = document.getElementById('addLocation-title')
usersLi.addEventListener('click', () => openLi(usersSection, 'users', usersTable))
companyLi.addEventListener('click', () => openLi(companySection, 'companies', companyTable))
regionLi.addEventListener('click', () => openLi(regionSection, 'regions'))
addLocationButton.addEventListener('click', ()=> addNewRegister('regions', addLocationButton.id))

function openLi(liSection, path, table){
    liSection.classList.remove('dnone')
    liSection.classList.add('open-section')
    getRegisters(liSection, path, table)
}
async function getRegisters(liSection, path, table){
    const url = `http://localhost:3010/${path}`
    const response = await fetch(url)
    const results = await response.json()
    if(liSection=== regionSection){
        renderRegions(results, liSection)
    }else{
        renderTable(results, table, path) 
    }
}
async function addNewRegister(path, buttonId){
    const model = model.input
    const name = newLocation.input
    const id = buttonId
    console.log(model.input, newLocation, id)
    const url = `http://localhost:3010/${path}`
    const response = await fetch(url,{
        method: "POST",
        body: {model, name, id}
    })

}

async function deleteRegister(path, id){
    console.log(id)
    // const formData = new FormData()
    // formData.append('id', id)
    const url = `http://localhost:3010/${path}`
    const response = await fetch(url, {
        method: "DELETE",
        body: {id: id}
    })

}
function renderRegions(results, liSection){
    const addRegion = document.createElement('a')
    addRegion.innerText = 'Añadir región'
    addRegion.classList = 'add-locations-buttons'
    addRegion.addEventListener('click',() => openAddButton('Región'))
    regionSection.appendChild(addRegion)
    results.forEach(item => {
        console.log(item)
        const regionDiv = document.createElement('div')
        const p = document.createElement('p')
        const addCountry = document.createElement('a')
        p.innerText = item.name
        p.id = item.Countries[0].RegionId
        regionDiv.id = 'RegionId '+ item.Countries[0].RegionId
        addCountry.innerText = 'Añadir país'
        addCountry.classList = 'add-locations-buttons'
        addCountry.addEventListener('click',() => openAddButton('País'))
        addCountry.id = 'buttonDependentOnRegionId '+ item.Countries[0].RegionId
        regionDiv.appendChild(addCountry)
        regionDiv.appendChild(p)
        liSection.appendChild(regionDiv)
        const eachRegionsCountries = item.Countries
        eachRegionsCountries.forEach(item =>{
            const countryDiv = document.createElement('div')
            const p = document.createElement('p')
            const addCity = document.createElement('a')
            p.innerText = item.name
            p.id = item.id
            countryDiv.id = 'CountryId '+ item.id
            addCity.innerText = 'Añadir ciudad'
            addCity.classList = 'add-locations-buttons'
            addCity.id = 'buttonDependentOnCountryId '+ item.id
            addCity.addEventListener('click',() => openAddButton('Ciudad'))
            regionDiv.appendChild(addCity)
            countryDiv.appendChild(p)
            regionDiv.appendChild(countryDiv)
            const eachCountryCities = item.Cities
            eachCountryCities.forEach(item =>{
                const p = document.createElement('p')
                p.innerText = item.name
                p.id = item.id
                countryDiv.appendChild(p)
                })
        })
    })
}

function renderTable(results, table, path){
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

function openAddButton(model){
    addLocation.classList.remove('dnone')
    addLocation.classList.add('add-register')
    addLocationTitle.innerText = `Añadir ${model}`
}

function openCommands(actionsButton, deleteButton, editButton){
    actionsButton.classList.remove('dblock')
    // actionsButton.classList.add('dnone')
    deleteButton.classList.remove('dnone')
    editButton.classList.remove('dnone')

}