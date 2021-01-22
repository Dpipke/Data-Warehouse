const app = require('express')();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

const {createUser, 
        checkUserInDB, 
        activateUser, 
        getUser, 
        deleteUser,
        updateUserInformation
    } = require('./database-functions')

app.use(bodyParser.json())
app.use(helmet())
app.use(verifyToken);

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
app.post('/users', filterAdmin, async (req, res)=>{
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
app.delete('/users', filterAdmin, async (req, res) => {
    const user = {
        id: req.body.id
    }
    const userDeleted = await deleteUser(user)
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