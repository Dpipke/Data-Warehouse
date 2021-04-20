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
    addContactChannel,
    updateContact
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
    const user = {
        id: req.params.id,
        name: req.body.name.name,
        lastname: req.body.name.lastname,
        email: req.body.name.email,
        admin: req.body.name.admin
    }
    const password = req.body.name.password
    if(password != ""){
        const saltRounds = 10;
            bcrypt.genSalt(saltRounds, async function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                if (err) throw res.status(400).send("An error has happened")
                else{
                Object.defineProperty(user, 'password', {value: hash})  
                const userUpdated = await updateUserInformation(user)
            res.status(201).send('User successfully activated')
            }})})  
    }else{
        const userUpdated = await updateUserInformation(user)
        res.status(201).send('User successfully activated')
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
    res.status(201).send()
} )

app.post('/countries', async (req, res) =>{
    const name = req.body.body.name
    const regionId = req.body.body.id
    addNewRegister('Country',name, regionId); 
    res.status(201).send()

} )

app.post('/cities', async (req, res) =>{
    const name = req.body.body.name
    const countryId = req.body.body.id
    addNewRegister('City',name, countryId); 
    res.status(201).send()

} )
app.put('/regions/:id', async (req, res) =>{
    const name = req.body
    const regionId = req.params.id
    console.log(name, countryId)
    updateRegister(); 
    res.status(201).send()

} )
app.put('/countries/:id', async (req, res) =>{
    const name = req.body
    const countryId = req.params.id
    console.log(name, countryId)
    res.status(201).send()
  
} )
app.put('/cities/:id', async (req, res) =>{
    const name = req.body
    const cityId = req.params.id
    console.log(name, countryId)
    res.status(201).send()

} )

app.delete('/regions/:id', async (req, res)=>{
    const locationId = req.params.id
    deleteRegister('Region', locationId)
    res.status(200).send()
})

app.delete('/countries/:id', async (req, res)=>{
    const locationId = req.params.id
    deleteRegister('Country', locationId)
    res.status(200).send()

})
app.delete('/cities/:id', async (req, res)=>{
    const locationId = req.params.id
    deleteRegister('City', locationId)
    res.status(200).send()

})



// companies
app.get('/companies', async (req, res)=>{
    const allCompanies = await getAllRegisters('Company')
    console.log(allCompanies)
    const mappedCompanies = allCompanies.map(item=> Object.assign({id: item.id, name: item.name, address: item.address, email: item.email, telephone: item.telephone, cityId:item.CityId, city: item.City.name, country: item.City.Country.name, region: item.City.Country.Region.name }) )
    console.log(mappedCompanies)
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
    res.status(201).send()
})
app.put('/companies/:id', async (req, res)=>{
    console.log(req.body)
    const companyToUpdate ={
        id: req.params.id,
        name: req.body.name.name,
        cityId: req.body.name.cityId,
        address: req.body.name.address,
        email: req.body.name.email,
        telephone: req.body.name.telephone
    }
    const updatedCompany =  await updateRegister('Çompany', companyToUpdate)
    res.status(201).send("updated")
})
app.delete('/companies/:id', async (req, res)=>{
    const companyId = req.params.id
    deleteRegister('Company', companyId)
    res.status(200).send()

})

app.get('/contacts', async(req, res)=>{
    const allContacts = await getContacts()
    const contacts = []
    const mappedContacts = allContacts.forEach(item => {
        const eachContact = Object.assign({id: item.id, name: item.name, lastname: item.lastname, email: item.email, country: item.City.Country.name, region: item.City.Country.Region.name, company: item.Company.name, position:item.position,interest: item.interest})
        // const favoriteChannels = allContacts.map(element => {
        //     if(item.id == element.id){
        //     const contactChannels = element.contact_channels
        //     contactChannels.forEach(channel =>{
        //         if(channel.preference.name == 'Favorito'){
        //             eachContact.favoriteChannels.push(channel.contact_social_medium.name)
        //             contacts.push(eachContact)

        //         }
        //     }
        //     )
            // }else{
                contacts.push(eachContact)
            // }
        // }
            // )
        })
    console.log(contacts.length)
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
    res.status(200).send()
})

app.put('/contacts/:id', async(req, res)=>{
    const contact = req.body.name
    const id = req.params.id
    const updatedContact = await updateContact(contact, id)
    res.status(201).send()
 })

app.get('/contacts/search', async(req, res)=>{
    const filters= req.headers.body
    const contacts = await searchContacts(filters)
    const contactsObtained = []
    const mappedContacts = contacts.forEach(item => {
        const eachContact = Object.assign({id: item.id, name: item.name, lastname: item.lastname, email: item.email, country: item.City.Country.name, region: item.City.Country.Region.name, company: item.Company.name, position:item.position, interest: item.interest})
        contactsObtained.push(eachContact)
        })
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