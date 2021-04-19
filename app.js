const mainSection = document.getElementById('mainSection')
const contactsLi = document.getElementById('contacts-li')
const usersLi = document.getElementById('users-li')
const companyLi = document.getElementById('company-li')
const regionLi = document.getElementById('region-li')
const usersSection = document.getElementById('users-section')
const companySection = document.getElementById('company-section')
const regionSection = document.getElementById('region-section')
const contactsSection = document.getElementById('contacts-section')
const usersTable = document.getElementById('users-table')
const companyTable = document.getElementById('company-table')
const contactsTable = document.getElementById('contacts-table')
const deleteContactSection = document.getElementById('delete-contact')
const deleteContactButton = document.getElementById('deleteContactButton')


const updateLocationSection = document.getElementById('update-location')
const deleteLocationSection = document.getElementById('delete-location')
const locationToDelete = document.getElementById('locationToDelete')
const addLocation = document.getElementById('add-location')
const addLocationButton = document.getElementById('add-location-button')
const newLocation = document.getElementById('input-new-location')
const addLocationTitle = document.getElementById('addLocation-title')
usersLi.addEventListener('click', () => openLi('User', usersSection, 'users', tbodyUser))
companyLi.addEventListener('click', () => openLi('Company', companySection, 'companies', tbodyCompany))
regionLi.addEventListener('click', () => openLi('Region', regionSection, 'regions'))
contactsLi.addEventListener('click', () => openLi('Contacts', contactsSection, 'contacts', tbodyContact))

const yesButton=  document.getElementById('yesButton')
const noButton = document.getElementById('noButton')
const cancelUpdateLocation = document.getElementById('cancel-update-section')
const updateLocationButton = document.getElementById('update-location-button')
const inputLocationToUpdate = document.getElementById('inputlocationToUpdate')
cancelUpdateLocation.addEventListener('click', ()=> closeWindow(updateLocationSection, regionSection))

const addCompanyWindow = document.getElementById('addCompanyWindow')
const addCompanyButton = document.getElementById('addCompanyButton-openWindow')
const addCompanyToDBButton = document.getElementById('addCompanyButton')
const cancelAddCompany = document.getElementById('cancelAddCompany')
const postCompanyRegion = document.getElementById('postCompanyRegion')
const postCompanyCountry = document.getElementById('postCompanyCountry')
const postCompanyCity = document.getElementById('postCompanyCity')
const addContactButton = document.getElementById('addContactButton')
const addContact = document.getElementById('addContact')
const addContactWindow = document.getElementById('addContactWindow')
const postContactRegion = document.getElementById('postContactRegion')
const postContactCountry = document.getElementById('postContactCountry')
const postContactCity = document.getElementById('postContactCity')
const postContactChannel = document.getElementById('postContactChannel')
const postContactPreference = document.getElementById('postContactPreference')
const inputContactChannelUsername = document.getElementById('inputContactChannelUsername')
const addChannelBtn = document.getElementById('addChannelBtn')

const inputCompanyName = document.getElementById('inputCompanyName')
const inputCompanyAddress = document.getElementById('inputCompanyAddress')
const inputCompanyEmail = document.getElementById('inputCompanyEmail')
const inputCompanyTelephone = document.getElementById('inputCompanyTelephone')
const inputSelectedInterest = document.getElementById('inputSelectedInterest')
const inputEditSelectedInterest = document.getElementById('inputEditSelectedInterest')
const progressInterest = document.getElementById('progressInterest')
const editProgressInterest = document.getElementById('editProgressInterest')

const inputContactName = document.getElementById('inputContactName')
const inputContactLastname = document.getElementById('inputContactLastname')
const inputContactPosition = document.getElementById('inputContactPosition')
const inputContactEmail = document.getElementById('inputContactEmail')
const inputContactAddress = document.getElementById('inputContactAddress')
const inputContactCompany = document.getElementById('inputContactCompany')
const tbodyContact = document.getElementById('tbodyContact')

const tbodyCompany = document.getElementById('tbodyCompany')
const tbodyUser = document.getElementById('tbodyUser')
const deleteCompanySection= document.getElementById('deleteCompanySection')

const arrowDownSearch = document.getElementById('arrowDownSearch')
const searchOptions = document.getElementById('searchOptions')

const inputContactNameToSearch = document.getElementById('inputContactNameToSearch')
const inputContactPositionToSearch = document.getElementById('inputContactPositionToSearch')
const inputContactLocationToSearch = document.getElementById('inputContactLocationToSearch')
const inputContactCompanyToSearch = document.getElementById('inputContactCompanyToSearch')
const inputContactLastnameToSearch = document.getElementById('inputContactLastnameToSearch')

inputSelectedInterest.addEventListener('click', ()=>{
    const interestPercentage = inputSelectedInterest.options[inputSelectedInterest.selectedIndex].value
    progressInterest.value = interestPercentage

})
inputEditSelectedInterest.addEventListener('click', ()=>{
    const interestPercentage = inputEditSelectedInterest.options[inputEditSelectedInterest.selectedIndex].value
    editProgressInterest.value = interestPercentage

})

arrowDownSearch.addEventListener('click', ()=> {
    searchOptions.classList.toggle('dnone')
    searchOptions.classList.toggle('searchOptions')
    // assignRegionToForm(inputContactLocationToSearch)
    assignCompaniesToForm(inputContactCompanyToSearch)
} )

const searchLens = document.getElementById('searchLens')
searchLens.addEventListener('click', async ()=>{

    const url = `http://localhost:3010/contacts/search`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('userToken'),
        body: JSON.stringify({
            name: inputContactNameToSearch.value,
            lastname: inputContactLastnameToSearch.value,
            position: inputContactPositionToSearch.value,
            company: inputContactCompanyToSearch.options[inputContactCompanyToSearch.selectedIndex].value
        })
    },
    })
    const results = await response.json()
    tbodyContact.innerHTML = ""
    renderContacts(results)

} )

addContactButton.addEventListener('click',()=> {
    openAddButton('contacts', null,addContactWindow)
    renderContactChannels(addContactChannelFieldset)
} )
addCompanyButton.addEventListener('click', ()=>openAddButton('companies', null,addCompanyWindow ))
cancelAddCompany.addEventListener('click', ()=> closeWindow(addCompanyWindow, regionSection))
addCompanyToDBButton.addEventListener('click', ()=>addNewRegister(
    'companies',
    {
        name: inputCompanyName.value,
        cityId: postCompanyCity.options[postCompanyCity.selectedIndex].value,
        address: inputCompanyAddress.value,
        email: inputCompanyEmail.value,
        telephone: inputCompanyTelephone.value
    }, 
    addCompanyWindow,
    companySection,
    tbodyCompany))

const addUserButtonOpenWindow = document.getElementById('addUserButton-openWindow')
const addUserWindow = document.getElementById('addUserWindow')
const postUserName = document.getElementById('postUserName')
const postUserLastname = document.getElementById('postUserLastname')
const postUserEmail = document.getElementById('postUserEmail')
const postUserRole = document.getElementById('postUserRole')
const postUserPassword = document.getElementById('postUserPassword')
const postUserRepeatPassword = document.getElementById('postUserRepeatPassword')
const invalidPassword = document.getElementById('invalidPassword')
const cancelAddUser = document.getElementById('cancelAddUser')
const addUserButton = document.getElementById('addUserButton')
const closeAddUserWindow = document.getElementById('closeAddUserWindow')
const closeAddUser = document.getElementById('closeAddUser')
const deleteUserSection = document.getElementById('deleteUserSection')
const userToDelete = document.getElementById('userToDelete')
const deleteUserButton = document.getElementById('deleteUserButton')
const cancelDeleteUser = document.getElementById('cancelDeleteUser')
addUserButtonOpenWindow.addEventListener('click', ()=> openAddButton('users', null, addUserWindow))
cancelDeleteUser.addEventListener('click', ()=> {
    console.log('anda')
    closeWindow(deleteUserSection, usersSection)
    closeWindow(deleteCompanySection, usersSection)
})

function openLi(model, liSection, path, table){
    if(liSection.classList == 'dnone'){
        liSection.classList.remove('dnone')
        liSection.classList.add('open-section')
    getRegisters(liSection, path, table, model)
    }else{
        liSection.classList.remove('open-section')
        liSection.classList.add('dnone')
    }
}
async function getRegisters(liSection, path, table, model){
    const url = `http://localhost:3010/${path}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('userToken'),
      },
    })
    const results = await response.json()
    if(liSection=== regionSection){
        renderRegions(results, liSection)
    }if(liSection === contactsSection){
        console.log(results)
        renderContacts(results)
    }if(liSection === usersSection || liSection === companySection){
        renderTable(results, table, path, model ) 
    }
}
async function addNewRegister(path,  body, window, mainSection, table){
    const url = `http://localhost:3010/${path}`
    const response = await fetch(url,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('userToken'),

        },
        method: "POST",
        body: JSON.stringify({body})
    })
    const resultsStatus = await response.status
    if(resultsStatus === 201){
        window.classList.remove('fixed-window')
        window.classList.add('dnone')
        getRegisters(mainSection, path, table)
    }
   
}

async function deleteRegister(path, id, window, mainSection, table){
    const url = `http://localhost:3010/${path}/${id}`
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('userToken'),
        }
    })
    const resultsStatus = await response.status
    if(resultsStatus === 200){
        window.classList.remove('fixed-window')
        window.classList.add('dnone')
        console.log(mainSection, path, table)
        getRegisters(mainSection, path, table)
    }

}
async function updateRegister(updatedInformation, path, id, window, liSection, table, model){
    console.log(updatedInformation)
    const url = `http://localhost:3010/${path}/${id}`
    const response = await fetch(url,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('userToken'),

        },
        method: "PUT",
        body: JSON.stringify({name: updatedInformation})
    })
    const result = await response.status
    console.log(result)
    if(result == 201){
        window.classList.remove('fixed-window')
        mainSection.classList.add('dnone')
        getRegisters(liSection, path, table, null)
    }
    
}
const appendLocations = document.getElementById('appendLocations')

function renderRegions(results, liSection){
    appendLocations.innerHTML = ""
    const addRegion = document.createElement('a')
    addRegion.innerText = 'Añadir región'
    addRegion.classList = 'locations-buttons addLocation addRegion'
    addRegion.addEventListener('click',() => openAddButton('Region', null, addLocation))
    appendLocations.appendChild(addRegion)
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
        appendLocations.appendChild(regionDiv)
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
            deleteLocationButton.addEventListener('click', () =>  openWindow('delete',p.innerText, deleteLocationButton.id, deleteLocationSection))
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


function renderContacts(results){
    tbodyContact.innerHTML = ""
    results.forEach(item =>{
        console.log(item)
        const tr = document.createElement('tr')
        const actionsButton = document.createElement('i')
        const editButton = document.createElement('i')
        const deleteButton = document.createElement('i')
        const allButtonsDiv = document.createElement('div')
        const buttonsDiv = document.createElement('div')
        const checkbox = document.createElement('input')
        checkbox.classList = 'checkbox'
        checkbox.type = 'checkbox'
        actionsButton.alt = 'action'
        actionsButton.classList = 'fas fa-ellipsis-v'
        deleteButton.alt = 'delete'
        deleteButton.classList = 'fas fa-trash'
        editButton.alt = 'edit'
        editButton.classList = 'fas fa-pen'
        buttonsDiv.classList = 'dnone'
        allButtonsDiv.classList= 'allButtons'
        tr.id = item.id
        delete item.id
        checkbox.addEventListener('click', () => {
            clickedCheckbox(tr)})
        actionsButton.addEventListener('click', () => {
            buttonsDiv.classList.remove('dnone')
            buttonsDiv.classList.add('buttonsDiv')
        })
        buttonsDiv.appendChild(editButton)
        buttonsDiv.appendChild(deleteButton)
        allButtonsDiv.appendChild(actionsButton)
        allButtonsDiv.appendChild(buttonsDiv)
        editButton.addEventListener('click', () => openEditContactWindow(item, tr.id, item.name, item.lastname))
        deleteButton.addEventListener('click', () =>  openCompaniesOrUsersWindow(item.name+" "+ item.lastname, tr.id, deleteContactSection, contactsSection, buttonsDiv))
        const registerValues = Object.values(item)
        const tdNameAndEmail = document.createElement('td')
        const tdLocation = document.createElement('td')
        const tdCompany = document.createElement('td')
        const tdPosition = document.createElement('td')
        const tdFavoriteChannel = document.createElement('td')
        const tdInterest = document.createElement('td')
        tdNameAndEmail.innerHTML = item.name+" "+ item.lastname + '<br>'+ item.email
        tdLocation.innerText = item.country + " "+item.region
        tdCompany.innerText = item.company
        tdPosition.innerText = item.position
        tdFavoriteChannel.innerText = item.favoriteChannels
        tdInterest.innerHTML = `<progress max = 100 value="${item.interest}"></progress>`
        tdInterest.value = item.interest
        tr.appendChild(checkbox)
        tr.appendChild(tdNameAndEmail)
        tr.appendChild(tdLocation)
        tr.appendChild(tdCompany)
        tr.appendChild(tdPosition)
        tr.appendChild(tdFavoriteChannel)
        tr.appendChild(tdInterest)
        tr.appendChild(allButtonsDiv)
        tbodyContact.appendChild(tr)
        
        })
    
}
function renderTable(results, table, path, model){
    table.innerHTML = ""
    results.forEach(item => {
    const tr = document.createElement('tr')
    const actionsButton = document.createElement('i')
    const editButton = document.createElement('i')
    const deleteButton = document.createElement('i')
    const allButtonsDiv = document.createElement('div')
    const buttonsDiv = document.createElement('div')
    const cityId = document.createElement('p')
    actionsButton.alt = 'action'
    actionsButton.classList = 'fas fa-ellipsis-v'
    deleteButton.alt = 'delete'
    deleteButton.classList = 'fas fa-trash'
    editButton.alt = 'edit'
    editButton.classList = 'fas fa-pen'
    buttonsDiv.classList = 'dnone'
    allButtonsDiv.classList= 'allButtons'
    cityId.id = item.cityId
    tr.id = item.id
    delete item.id
    delete item.cityId
    actionsButton.addEventListener('click', () => {
        buttonsDiv.classList.remove('dnone')
        buttonsDiv.classList.add('buttonsDiv')
    })
    buttonsDiv.appendChild(editButton)
    buttonsDiv.appendChild(deleteButton)
    allButtonsDiv.appendChild(actionsButton)
    allButtonsDiv.appendChild(buttonsDiv)
    if(model == 'User'){
        deleteButton.addEventListener('click', () => {openCompaniesOrUsersWindow(item.name+ " "+ item.lastname , tr.id, deleteUserSection, usersSection, buttonsDiv)})
        editButton.addEventListener('click', () => openEditUserWindow(item, tr.id))
    }if(model == 'Company'){
        deleteButton.addEventListener('click', () =>  openCompaniesOrUsersWindow(item.name , tr.id, deleteCompanySection, companySection, buttonsDiv))
        editButton.addEventListener('click', () => openEditCompanyWindow(item, tr.id, cityId))
    }
    const registerValues = Object.values(item)
    registerValues.forEach( register =>{
        const td = document.createElement('td')
        td.innerText = register   
        tr.appendChild(td)
        tr.appendChild(allButtonsDiv)
        table.appendChild(tr)
    })
    })
}

async function openAddButton(model, modelDependentOnId, window){
    window.classList.remove('dnone')
    window.classList.add('fixed-window')
    addLocationTitle.innerText = `Añadir ${model}`
    if(modelDependentOnId !=null ){
        const id = modelDependentOnId.split(' ')[1]
        const modelDependentOn = modelDependentOnId.split(' ')[0]
        const locationBody ={
            name: newLocation.value,
            id: id
        }
        if(modelDependentOn == 'Region'){
            addLocationButton.addEventListener('click', ()=> addNewRegister('countries', 
            {
                name: newLocation.value,
                id: id
            }, window, regionSection, null))
        }
        if(modelDependentOn == 'Country'){
            addLocationButton.addEventListener('click', ()=> addNewRegister('cities', {
                name: newLocation.value,
                id: id
            }, window, regionSection, null))
        }
    }else{
        addLocationButton.addEventListener('click', ()=> addNewRegister('regions', {
            name: newLocation.value
        }))
        if(window == addContactWindow){
            assignRegionToForm(postContactRegion)
            changeCountry(postContactRegion, postContactCountry, postContactCity)
            assignCompaniesToForm(inputContactCompany)
            const input = document.getElementsByName('userAccountName')
            const contactChannels = []
            addContact.addEventListener('click', ()=> {
                input.forEach(item=>{
                    const preference = document.getElementsByName(item.id)
                    console.log(preference[0].options.selectedIndex)
                    if(item.value != ""){
                    const eachCC =  { ContactChannel: item.id,
                                    userAccount:item.value,
                                    preference: preference[0].options.selectedIndex
                                }
                    contactChannels.push(eachCC)
                    }
                })
                addNewRegister('contacts', {
                name: inputContactName.value,
                lastname: inputContactLastname.value,
                position: inputContactPosition.value,
                companyId: inputContactCompany.options[inputContactCompany.selectedIndex].value,
                email: inputContactEmail.value,
                cityId: postContactCity.value,
                address: inputContactAddress.value,
                interest: progressInterest.value,
                contactChannels: contactChannels},
                addContactWindow,
                contactsSection, 
                tbodyContact)
        })
        }
        if(postUserPassword.value==postUserRepeatPassword.value){
            addUserButton.addEventListener('click', () => {
                const userBody = {
                    name: postUserName.value,
                    lastname: postUserLastname.value,
                    email: postUserEmail.value,
                    password: postUserPassword.value,
                    role: postUserRole.value
                }
                addNewRegister('users', userBody, addUserWindow, usersSection, tbodyUser)})
            if(window == addCompanyWindow){
                    assignRegionToForm(postCompanyRegion)
                    changeCountry(postCompanyRegion, postCompanyCountry, postCompanyCity)
            addCompanyButton.addEventListener('click', () => {})
        }}else{
            invalidPassword.classList.remove('dnone')
            invalidPassword.classList.add('warning')

        }
}
}
const selectedContacts = document.getElementById('selectedContacts')
const deleteContacts = document.getElementById('deleteContacts')
async function clickedCheckbox(tr){
    const selectedContactsArray = []
    tr.classList.toggle('blue')
    if(tr.classList == 'blue'){
        selectedContactsArray.push(tr.id)
    }else{
        selectedContactsArray.filter((i)=> i !== tr.id)
    }
    if(selectedContactsArray.length == 0){
        selectedContacts.innerText = ""
        selectedContacts.className = 'dnone'
    }else{
        selectedContacts.innerText = `${selectedContactsArray.length} seleccionados`
        selectedContacts.className ='selectedContacts'
        deleteContacts.className = 'locations-buttons'
        deleteContacts.addEventListener('click', () =>{
            selectedContactsArray.forEach(item =>{
                deleteRegister('contacts', +item)
            })
        })
    }
}
const userLogin = document.getElementById('userLogin')
const passwordLogin = document.getElementById('passwordLogin')
const loginButton = document.getElementById('loginButton')
const loginSection = document.getElementById('loginSection')
const incorrectData = document.getElementById('incorrectData')
const nav = document.getElementById('nav')

if(sessionStorage.getItem('userToken') != null){
    loginSection.classList.remove('fixed-window')
    loginSection.classList.add('dnone')
    
    if(sessionStorage.getItem('userToken').adminPrivilege == true){
        nav.classList.remove('dnone')
        nav.classList.add('ul-nav')
    }else{
        nav.classList.remove('dnone')
        nav.classList.add('ul-nav')
        // usersLi.classList.add('dnone')
    }
}

loginButton.addEventListener('click',async ()=>{
    const userLoginValue = userLogin.value
    const passwordLoginValue = passwordLogin.value
    const url = `http://localhost:3010/login`
    const response = await fetch(url,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('userToken'),

        },
        method: "POST",
        body: JSON.stringify({user: userLoginValue, password: passwordLoginValue})
    }).then(response => permiso(response)).then(response => response.json()).then(response => sessionLogin(response))

async function permiso(response){
    const resultsStatus = await response.status
    if(resultsStatus == 200){
        loginSection.classList.remove('fixed-window')
        loginSection.classList.add('dnone')
        
    }else{
        incorrectData.classList.remove('dnone')
        incorrectData.classList.add('warning')
    }
    return response
}
async function sessionLogin(response){
    sessionStorage.setItem('userToken', response.userToken)
    // const myHeaders = new Headers()
    // myHeaders.append('Authorization', `Bearer ${response.userToken}`);

    // if(response.adminPrivilege == true){
    //     nav.classList.remove('dnone')
    //     nav.classList.add('ul-nav')
    // }else{
    //     nav.classList.remove('dnone')
    //     nav.classList.add('ul-nav')
    //     usersLi.classList.add('dnone')
    // }
}

})
function openWindow(method, registerToDelete, buttonClickedId, section){
    section.classList.remove('dnone')
    section.classList.add('fixed-window')
    section.classList.add('login')
    console.log(section)
    const model = buttonClickedId.split(' ')[0]
    const placeId = buttonClickedId.split(' ')[1]
    locationToDelete.innerText = registerToDelete +'?'

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
                deleteRegister(path, placeId, deleteLocationSection, regionSection, null), closeWindow(deleteLocationSection, regionSection, 'regions', 'Region', )})
        }if(model == 'Country'){
            const path = 'countries'
            yesButton.addEventListener('click', () => {
                deleteRegister(path, placeId, deleteLocationSection, regionSection, null), closeWindow(deleteLocationSection, regionSection, 'regions', 'Region')})
        }if(model == 'City'){
            const path = 'cities'
            yesButton.addEventListener('click', () => {
                deleteRegister(path, placeId, deleteLocationSection, regionSection, null), closeWindow(deleteLocationSection, regionSection, 'regions',  'Region')})
        }}

}
const editContactWindow = document.getElementById('editContactWindow')
const editContactName = document.getElementById('editContactName')
const editContactLastname = document.getElementById('editContactLastname')
const editContactPosition = document.getElementById('editContactPosition')
const editContactEmail = document.getElementById('editContactEmail')
const editContactCompany = document.getElementById('editContactCompany')
const editContactRegion = document.getElementById('editContactRegion')
const editContactCountry = document.getElementById('editContactCountry')
const editContactCity = document.getElementById('editContactCity')
const editContactChannel = document.getElementById('editContactChannel')

const editContact = document.getElementById('editContact')
async function openEditContactWindow(item, id){
    renderContactChannels(editContactChannelFieldset)
    assignRegionToForm(editContactRegion)
    assignCompaniesToForm(editContactCompany)
    changeCountry(editContactRegion, editContactCountry, editContactCity)
    editContactWindow.classList.remove('dnone')
    editContactWindow.classList.add('fixed-window')
    editContactPosition.value = item.position
    editContactEmail.value = item.email
    editContactName.value = item.name
    editContactLastname.value = item.lastname
    editContactCompany.value = item.company
    inputEditSelectedInterest.value = item.interest
    editContact.addEventListener('click', ()=>{
        updateRegister(
            {name:editContactName.value,
            lastname: editContactLastname.value,
            email: editContactEmail.value,
            position: editContactPosition.value,
            companyId: editContactCompany.value,
            cityId: editContactCity.value,
            interest: inputEditSelectedInterest.value
         }, 
         'contacts', 
         id, 
         editContactWindow, 
         contactsSection,
         tbodyContact, null)
    })
}

const companyToDelete = document.getElementById('companyToDelete')
const deleteCompanyButton = document.getElementById('deleteCompanyButton')

function openCompaniesOrUsersWindow(registerToDelete, buttonClickedId, window, section, buttonsDiv){
    window.classList.remove('dnone')
    window.classList.add('fixed-window')
    window.classList.add('login')
    buttonsDiv.classList = ""
    buttonsDiv.classList.add('dnone')
    userToDelete.innerText = registerToDelete + " de la base de datos de usuarios?"
    companyToDelete.innerText = registerToDelete + " de la base de datos de compañías?"
    deleteUserButton.addEventListener('click', () => {
        deleteRegister('users', buttonClickedId, window, section, tbodyUser),
        closeWindow(window, section)
    })
    deleteContactButton.addEventListener('click', ()=>{
        deleteRegister('contacts', buttonClickedId, window, section, tbodyContact)
        closeWindow(window, section)
    })
    deleteCompanyButton.addEventListener('click', ()=>{
        deleteRegister('companies', buttonClickedId, window, section, tbodyCompany)
        closeWindow(window, section)
    } )
}

function closeWindow(window, mainSection){
    console.log(window)
    window.className = ""
    window.classList.add('dnone')
    // mainSection.innerHTML = ""
    // ver como recargar la pagin
}

async function getLocations(){
    const url = `http://localhost:3010/regions`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('userToken')
        }})
    const results = await response.json()
    return results
}
async function getContactChannels(){
    const url = `http://localhost:3010/contactchannels`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('userToken')
        }})
    const results = await response.json()
    return results
}
async function getContactPreferences(){
    const url = `http://localhost:3010/preferences`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('userToken')
        }})
    const results = await response.json()
    return results
}
async function assignRegionToForm(postRegion){
    const allLocations = await getLocations()
    allLocations.forEach( region =>{
        const option = document.createElement('option')
        option.innerText = region.regionName
        option.id = region.regionId
        option.value = region.regionId
        postRegion.appendChild(option)
})
}
async function assignContactChannelsToForm(postChannel){
    const allContactChannels = await getContactChannels()
    allContactChannels.forEach( contact =>{
        const option = document.createElement('option')
        option.innerText = contact.name
        option.id = contact.id
        option.value = contact.id
        postChannel.appendChild(option)
})
}
async function assignContactPreferencesToForm(postPreference){
    const allContactPreferences = await getContactPreferences()
    allContactPreferences.forEach( contact =>{
        const option = document.createElement('option')
        option.innerText = contact.name
        option.id = contact.id
        option.value = contact.id
        postPreference.appendChild(option)
})
}
async function assignCompaniesToForm(selectCompany){
    const url = `http://localhost:3010/companies`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('userToken'),
      },
    })
    const results = await response.json()
    results.forEach( company =>{
        const option = document.createElement('option')
        option.innerText = company.name
        option.id = company.id
        option.value = company.id
        selectCompany.appendChild(option)
})
}
async function changeCountry(postRegion, postCountry, postCity){
    postRegion.addEventListener('change', async (event)=>{
        const chosenRegionId = postRegion.options[postRegion.selectedIndex].value
        const url = `http://localhost:3010/countries/${chosenRegionId}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('userToken')
            }})
        const results = await response.json()
        results.forEach( country =>{
            const option = document.createElement('option')
            option.innerText = country.countryName
            option.id = country.countryId
            option.value = country.countryId
            postCountry.appendChild(option)
            postCountry.addEventListener('change', async (event)=>{
                const chosenCountryId = postCountry.options[postCountry.selectedIndex].value
                const cityUrl = `http://localhost:3010/cities/${chosenCountryId}`
                const cityResponse = await fetch(cityUrl, {
                    method: 'GET',
                    headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('userToken')
                    }})
                const cityResults = await cityResponse.json()
                cityResults.forEach(city =>{
                    console.log(city)
                    const option = document.createElement('option')
                    option.innerText = city.cityName
                    option.id = city.cityId
                    option.value = city.cityId
                    postCity.appendChild(option)
                })
            })
})})}

const addContactChannelFieldset = document.getElementById('addContactChannelFieldset')
const editContactChannelFieldset = document.getElementById('editContactChannelFieldset')

async function renderContactChannels(fieldest){
    const allContactChannels = await getContactChannels()
    allContactChannels.forEach(item =>{
        const div = document.createElement('div')
        const labelUserAccount = document.createElement('label')
        const labelPreferences = document.createElement('label')
        const inputUserAccount = document.createElement('input')
        const selectPreferences = document.createElement('select')
        const optionPreferences = document.createElement('option')
        const p =  document.createElement('p')
        p.innerText = item.name
        optionPreferences.innerText = " "
        inputUserAccount.name = 'userAccountName'
        inputUserAccount.id = item.id
        selectPreferences.name = item.id
        selectPreferences.appendChild(optionPreferences)
        assignContactPreferencesToForm(selectPreferences)
        labelPreferences.appendChild(selectPreferences)
        labelUserAccount.appendChild(p)
        labelUserAccount.appendChild(inputUserAccount)
        div.appendChild(labelUserAccount)
        div.appendChild(labelPreferences)
        fieldest.appendChild(div)

    })
}

const editCompanyWindow = document.getElementById('editCompanyWindow')
const editCompanyName = document.getElementById('editCompanyName')
const editCompanyAddress = document.getElementById('editCompanyAddress')
const editCompanyEmail = document.getElementById('editCompanyEmail')
const editCompanyTelephone = document.getElementById('editCompanyTelephone')
const editCompanyRegion = document.getElementById('editCompanyRegion')
const editCompanyCountry = document.getElementById('editCompanyCountry')
const editCompanyCity = document.getElementById('editCompanyCity')
const updateCompany = document.getElementById('updateCompany')

function openEditCompanyWindow(item, id, cityId){
    console.log(item)
    editCompanyWindow.classList.remove('dnone')
    editCompanyWindow.classList.add('fixed-window')
    assignRegionToForm(editCompanyRegion)
    changeCountry(editCompanyRegion, editCompanyCountry, editCompanyCity)
    editCompanyName.value = item.name
    editCompanyAddress.value = item.address
    editCompanyEmail.value = item.email
    editCompanyTelephone.value = item.telephone
    updateCompany.addEventListener('click', ()=>{
        console.log(editCompanyCity.options[editCompanyCity.selectedIndex].value)
         updateRegister(
        {
            name: editCompanyName.value,
            cityId:editCompanyCity.options[editCompanyCity.selectedIndex].value,
            address: editCompanyAddress.value,
            email: editCompanyEmail.value,
            telephone: editCompanyTelephone.value
        },
         'companies', id, editCompanyWindow, companySection, tbodyCompany, null)} )
    
}
const updateUserWindow = document.getElementById('updateUserWindow')
const editUserName = document.getElementById('editUserName')
const editUserLastname = document.getElementById('editUserLastname')
const editUserEmail = document.getElementById('editUserEmail')
const editUserRole = document.getElementById('editUserRole')
const editUserPassword = document.getElementById('editUserPassword')
const editUserRepeatPassword = document.getElementById('editUserRepeatPassword')
const updateUser = document.getElementById('updateUser')

async function openEditUserWindow(item, id){
    updateUserWindow.classList.remove('dnone')
    updateUserWindow.classList.add('fixed-window')
    editUserName.value = item.name
    editUserLastname.value = item.lastname
    editUserEmail.value = item.email
    if(item.admin == false){
        editUserRole.value = 'Basic'
    }else{
        editUserRole.value = 'Admin'
    }
    if(editUserPassword.value == editUserRepeatPassword.value){
        updateUser.addEventListener('click', () => 
            updateRegister({
            name:editUserName.value,
            lastname: editUserLastname.value,
            email: editUserEmail.value, 
            admin: editUserRole.options[editUserRole.selectedIndex].value,
            password: editUserPassword.value,
        }, 'users', id, updateUserWindow, usersSection, tbodyUser, 'User'))
}
}