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
const {getContacts}= require('./database-ContactFunctions')


app.use(bodyParser.json())
app.use(helmet())
// app.use(verifyToken);
app.use(cors())

const authorizationPassword = process.env.AuthPassword;

function verifyToken(req, res, next) {
    console.log(req.headers.authorization);
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
    max: 5
})

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
            res.status(400).send("Unexistent user. Contact Admin")
        }

    
})

app.put('/users/:id', async (req, res) =>{
    const user = {
        id: req.params.id,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        admin: req.body.perfil
    }
    const userUpdated = await updateUserInformation(user)
    console.log(userUpdated)
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
            console.log(userToken)
            res.status(200).json(userToken)
        }
        else {
            res.status(400).send("invalid user or password")
        }
    });

}});

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
    const mappedCompanies = allCompanies.map(item=> Object.assign({id: item.id, name: item.name, address: item.address, email: item.email, telephone: item.telephone, city: item.City.name, country: item.City.Country.name, region: item.City.Country.Region.name }) )
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
app.put('/companies', async (req, res)=>{
    const companyToUpdate ={
        id: req.body.id,
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
    console.log(allContacts)
    // res.status(200).json(allContacts)
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