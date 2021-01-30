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
        deleteUser,
        updateUserInformation
    } = require('./database-UserFunctions')
const {getAllRegisters,
        addNewLocation,
        updateRegister,
        deleteRegister
    } = require('./database-RegionsAndCompaniesFunctions')

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
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        admin: req.body.perfil, 
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
app.delete('/users', async (req, res) => {
    const id = req.body.id  
    console.log(req.body)
    // const userDeleted = await deleteUser(id)
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
    console.log(allLocations)
    res.status(200).json(allLocations)
})

app.post('/regions', async (req, res) =>{
    const name = req.body.name
    const id = req.body.id
    const model = req.body.model
    addNewLocation(model, name, id); 
} )

app.delete('/regions', async (req, res)=>{
    const locationId = req.body.id
    const model = req.body.model
    deleteRegister(model, locationId)
})

// companies
app.get('/companies', async (req, res)=>{
    const allCompanies = await getAllRegisters('Company')
    console.log(allCompanies)
    res.status(200).json(allCompanies)
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
app.delete('/companies', async (req, res)=>{
    const companyId = req.body.id
    deleteRegister('Company', companyId)
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