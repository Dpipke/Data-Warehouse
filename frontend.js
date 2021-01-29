const usersLi = document.getElementById('users-li')
const companyLi = document.getElementById('company-li')
const regionLi = document.getElementById('region-li')
const usersSection = document.getElementById('users-section')
const companySection = document.getElementById('company-section')
const regionSection = document.getElementById('region-section')
const usersTable = document.getElementById('users-table')
const companyTable = document.getElementById('company-table')

usersLi.addEventListener('click', () => openLi(usersSection, 'users', usersTable))
companyLi.addEventListener('click', () => openLi(companySection, 'companies', companyTable))
regionLi.addEventListener('click', () => openLi(regionSection, 'regions'))


function openLi(liSection, extension, table){
    liSection.classList.remove('dnone')
    liSection.classList.add('open-section')
    getLocations(liSection, extension, table)
}
async function getLocations(liSection, extension, table){
    const url = `http://localhost:3010/${extension}`
    const response = await fetch(url)
    const results = await response.json()
    if(liSection=== regionSection){
        renderRegions(results, liSection)
    }else{
        renderTable(results, table) 
    }
}

function renderRegions(results, liSection){
    results.forEach(item => {
        console.log(item)
        const p = document.createElement('p')
        p.innerText = item.name
        liSection.appendChild(p)
        const eachRegionsCountries = item.Countries
        eachRegionsCountries.forEach(item =>{
            console.log(item)
        })
    })
}

function renderTable(results, table){
    results.forEach(item => {
    console.log(item)
    const tr = document.createElement('tr')
    tr.id = item.id
    delete item.id
    const registerValues = Object.values(item)
    registerValues.forEach( register =>{
        const td = document.createElement('td')
        td.innerText = register   
        tr.appendChild(td)
        table.appendChild(tr)
    })


    
    // const register = Object.values(item)
    // register.forEach( item => {
        // tr.innerText = register
    })
    // });
}