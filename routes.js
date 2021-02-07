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
        addNewLocation,
        updateRegister,
        deleteRegister
    } = require('./database-RegionsAndCompaniesFunctions');


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
    const user = {
        name: req.body.body.name,
        lastname: req.body.body.lastname,
        email: req.body.body.email,
        admin: req.body.body.role, 
    }
    const userCreated= await createUser(user)
    res.status(201).json(userCreated)
    
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

app.post('/regions', async (req, res) =>{
    const name = req.body.name
    const id = req.body.id
    console.log(name, id)
    addNewLocation('Region',name, id); 
} )

app.post('/countries', async (req, res) =>{
    const name = req.body.name
    const regionId = req.body.id
    console.log(name, regionId)
    addNewLocation('Country',name, regionId); 
} )

app.post('/cities', async (req, res) =>{
    const name = req.body.name
    const countryId = req.body.id
    console.log(name, countryId)
    addNewLocation('City',name, countryId); 
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
        name: req.body.name,
        cityId: req.body.cityId,
        address: req.body.address,
        email: req.body.email,
        telephone: req.body.telephone
    }
    addNewLocation('Company', newCompany)
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
    const allContacts = await getAllRegisters('Contact')
    res.status(200).json(allContacts)
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