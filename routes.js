const app = require('express')();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const dotenv = require('dotenv').config();

const {createUser, 
        checkUserInDB, 
        activateUser, 
        getUser, 
        updateUserInformation
    } = require('./database-UserFunctions')
const {getAllRegisters,
        addNewRegister,
        updateRegister,
        deleteRegister
    } = require('./database-RegionsAndCompaniesFunctions');
const {getContacts,
    getContactChannels,
    getContactPreferences,
    deleteContact,
    searchContacts,
    createContact,
    addContactChannel
    }= require('./database-ContactFunctions')


app.use(bodyParser.json())
app.use(helmet())
app.use(cors())

const authorizationPassword = process.env.AuthPassword;

function verifyToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    try {
        jwt.verify(token, authorizationPassword);
        next();
    } catch (error) {
        res.status(401).send(error);
    }
}


const limiter = rateLimit({
    windowMs: 60*60*1000,
    max: 1000
})

app.post('/login', limiter, async (req, res) =>{
    const loginRequest ={
        user: req.body.user,
    }
    const passwordRequest = req.body.password
    const user = await getUser(loginRequest)
    console.log(user)
    if(user.length === 0){
        res.status(400).send("invalid user or password")
    }else{
    const objectUser = user[0]
    const objectPassword = objectUser.password
    console.log(objectPassword)
    console.log(passwordRequest)
    bcrypt.compare(passwordRequest, objectPassword, async function(err, result) {
        if (result) {
            const userToken = jwt.sign({user}, authorizationPassword)
            const isAdmin = jwt.verify(userToken, authorizationPassword);
            const adminPrivilege = isAdmin.user[0].admin
            res.status(200).json({userToken, adminPrivilege})
        }
        else {
            res.status(400).send("invalid user or password")
        }
    });

}});
app.use(verifyToken);


// users 
// admin creates users
app.get('/users', async (req, res)=>{
    const allUsers = await getAllRegisters('User')
    res.status(200).json(allUsers)
})
app.post('/users',  async (req, res)=>{
    console.log('anda')
    const user = {
        name: req.body.body.name,
        lastname: req.body.body.lastname,
        email: req.body.body.email,
        admin: req.body.body.role, 
        password: req.body.body.password,
        repeatPassword: req.body.body.repeatPassword
    }
        const existsUser = await checkUserInDB(user)
        if(existsUser.length == 0){
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, async function(err, salt) {
            bcrypt.hash(user.password, salt, async function(err, hash) {
                if (err) throw res.status(400).send("An error has happened")
                else{
                Object.defineProperty(user, 'hash', {value: hash})  
            const userCreated= await createUser(user)
            res.status(201).send('User successfully activated')
            }})})}  
        else{
            res.status(400).send("El usuario ya existe")
        }

    
})

app.put('/users/:id', async (req, res) =>{
    console.log(req.body)
    const user = {
        id: req.params.id,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        admin: req.body.admin
    }
    if(req.body.password != ""){
        const saltRounds = 10;
            bcrypt.genSalt(saltRounds, async function(err, salt) {
            bcrypt.hash(req.body.password, salt, async function(err, hash) {
                if (err) throw res.status(400).send("An error has happened")
                else{
                Object.defineProperty(user, 'password', {value: hash})  
                const userUpdated = await updateUserInformation(user)
            // res.status(201).send('User successfully activated')
            }})})  
    }
    // console.log(userUpdated)
})
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id  
    console.log(id)
    const userDeleted = await deleteRegister('User',id)
    res.status(200).send("User successfully deleted")
    // FALTA 404 USER NOT FOUND
})
// sacar
app.post('/signup', checkPassword, async (req, res)=>{
    const user = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        admin: req.body.perfil, 
        password: req.body.password,
        repeatPassword: req.body.repeatPassword
    }
    const validUser = await checkUserInDB(user)
    console.log(validUser.length)
    if(validUser.length == 1){
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) throw res.status(400).send("An error has happened")
            else{
            Object.defineProperty(user, 'hash', {value: hash})  
        activateUser(user)
        res.status(201).send('User successfully activated')
        }})})}  
    else{
        res.status(404).send("Unexistent user. Contact Admin")
    }
    
})



// regions 
app.get('/regions' , async (req, res)=>{
    const allLocations = await getAllRegisters('Region')
    const allRegions = allLocations[0]
    const allCountries = allLocations[1]
    const allCities = allLocations[2]
    const locationsArray = []
    const mappedLocations = allRegions.map(region =>{
            const eachLocation = Object.assign({"regionId": region.id, "regionName": region.name, "countries":[]})
            allCountries.map( country =>{
                if(region.id === country.RegionId){
                    const eachCountry = {"countryId": country.id, "countryName": country.name, "cities":[]}
                    eachLocation.countries.push(eachCountry)
                    allCities.map(city =>{
                        if(country.id === city.CountryId){
                            const eachCity = {"cityId": city.id, "cityName": city.name}
                            eachCountry.cities.push(eachCity)
                        }
                    })
                }
            } )
            locationsArray.push(eachLocation)
    })
    res.status(200).json(locationsArray)
})

app.get('/countries/:id', async(req, res)=>{
    const regionId = req.params.id
    const allCountries = await getAllRegisters('Country', regionId)
    const countriesArray = []
    const mappedCountries = allCountries.map( country=>{
        const eachCountry = Object.assign({"countryName": country.dataValues.name, "countryId":country.dataValues.id})
        countriesArray.push(eachCountry)
    })
    res.status(200).json(countriesArray)
})
app.get('/cities/:id', async(req, res)=>{
    const countryId = req.params.id
    const allCities = await getAllRegisters('City', countryId)
    const citiesArray = []
    const mappedCities = allCities.map( city=>{
        const eachCity = Object.assign({"cityName": city.dataValues.name, "cityId":city.dataValues.id})
        citiesArray.push(eachCity)
    })
    res.status(200).json(citiesArray)
})

app.post('/regions', async (req, res) =>{
    const name = req.body.body.name
    const id = req.body.id
    addNewRegister('Region',name, id); 
} )

app.post('/countries', async (req, res) =>{
    const name = req.body.body.name
    const regionId = req.body.body.id
    console.log(name, regionId)
    addNewRegister('Country',name, regionId); 
} )

app.post('/cities', async (req, res) =>{
    const name = req.body.body.name
    const countryId = req.body.body.id
    console.log(name, countryId)
    addNewRegister('City',name, countryId); 
} )
app.put('/regions/:id', async (req, res) =>{
    const name = req.body
    const regionId = req.params.id
    console.log(name, countryId)
    updateRegister(); 
} )
app.put('/countries/:id', async (req, res) =>{
    const name = req.body
    const countryId = req.params.id
    console.log(name, countryId)
  
} )
app.put('/cities/:id', async (req, res) =>{
    const name = req.body
    const cityId = req.params.id
    console.log(name, countryId)

} )

app.delete('/regions/:id', async (req, res)=>{
    const locationId = req.params.id
    deleteRegister('Region', locationId)
})

app.delete('/countries/:id', async (req, res)=>{
    const locationId = req.params.id
    deleteRegister('Country', locationId)
})
app.delete('/cities/:id', async (req, res)=>{
    const locationId = req.params.id
    deleteRegister('City', locationId)
})



// companies
app.get('/companies', async (req, res)=>{
    const allCompanies = await getAllRegisters('Company')
    const mappedCompanies = allCompanies.map(item=> Object.assign({id: item.id, name: item.name, address: item.address, email: item.email, telephone: item.telephone, cityId:item.CityId, city: item.City.name, country: item.City.Country.name, region: item.City.Country.Region.name }) )
    res.status(200).json(mappedCompanies)

})

app.post('/companies', async (req, res)=>{
    const newCompany = {
        name: req.body.body.name,
        cityId: req.body.body.cityId,
        address: req.body.body.address,
        email: req.body.body.email,
        telephone: req.body.body.telephone
    }
    addNewRegister('Company', newCompany)
})
app.put('/companies/:id', async (req, res)=>{
    console.log(req.body)
    const companyToUpdate ={
        id: req.params.id,
        name: req.body.name,
        cityId: req.body.cityId,
        address: req.body.address,
        email: req.body.email,
        telephone: req.body.telephone
    }
    const updatedCompany =  await updateRegister('Çompany', companyToUpdate)
    res.status(200).send("updated")
})
app.delete('/companies/:id', async (req, res)=>{
    const companyId = req.params.id
    deleteRegister('Company', companyId)
})

app.get('/contacts', async(req, res)=>{
    const allContacts = await getContacts()
    const contacts = []
    const mappedContacts = allContacts.forEach(item => {
        console.log(item)
        const eachContact = Object.assign({id: item.id, name: item.name, lastname: item.lastname, email: item.email, country: item.City.Country.name, region: item.City.Country.Region.name, company: item.Company.name, position:item.position, favoriteChannels: [],interest: item.interest})
        const favoriteChannels = allContacts.map(element => {
            if(item.id == element.id){
            const contactChannels = element.contact_channels
            contactChannels.forEach(channel =>{
                if(channel.preference.name == 'Favorito'){
                    eachContact.favoriteChannels.push(channel.contact_social_medium.name)
                    contacts.push(eachContact)

                }
            })
            }else{
                contacts.push(eachContact)
            }})})
    res.status(200).json(contacts)
})

app.post('/contacts', async(req, res)=>{
    console.log(req.body.body)
    const createdContact = await createContact(req.body.body)
    const createdChannels = await addContactChannel(req.body.body, createdContact)
    res.status(201).send()
}) 

app.delete('/contacts/:id', async(req, res)=>{
    const contactId = req.params.id
    deleteContact(contactId)
})

app.get('/contacts/search', async(req, res)=>{
    const filters= req.headers.body
    const contacts = await searchContacts(filters)
    const contactsObtained = []
    const mappedContacts = contacts.forEach(item => {
        const eachContact = Object.assign({id: item.id, name: item.name, lastname: item.lastname, email: item.email, country: item.City.Country.name, region: item.City.Country.Region.name, company: item.Company.name, position:item.position, favoriteChannels: [],interest: item.interest})
        const favoriteChannels = contacts.map(element => {
            if(item.id == element.id){
            const contactChannels = element.contact_channels
            contactChannels.forEach(channel =>{
                if(channel.preference.name == 'Favorito'){
                    eachContact.favoriteChannels.push(channel.contact_social_medium.name)
                    contactsObtained.push(eachContact)

                }
            })
            }else{
                contactsObtained.push(eachContact)
            }})})
    res.status(200).json(contactsObtained)
})

app.get('/contactchannels', async(req, res)=>{
    const allContactChannels = await getContactChannels()
    res.status(200).json(allContactChannels)
})
app.get('/preferences', async(req, res)=>{
    const allContactPreferences = await getContactPreferences()
    res.status(200).json(allContactPreferences)
})

app.listen(3010, () => console.log("server started"))

async function checkPassword(req, res, next){
    if(req.body.password === req.body.repeatPassword){
        next()
    }else{
        res.status(400).send("Passwords must be the same")
    }
}

function filterAdmin(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, authorizationPassword);
    const adminPrivilege = user.user[0].admin
    console.log(adminPrivilege);
    if(adminPrivilege === true ) {
        next();
    } else {
        res.status(403).send('forbidden access');
    }
}