const {Sequelize, DataTypes} = require("sequelize")
const {User} = require('./database-models')


async function createUser(userProvided){
    const role = userProvided.admin === "Admin"
    const userToCreate = await User.create({name: userProvided.name, lastname: userProvided.lastname, email: userProvided.email, admin: role, password: userProvided.hash})
}

async function checkUserInDB(user){
    const userToCheck = User.findAll({
    where: {
    email: user.email,
  }
});
    return userToCheck
}

async function activateUser(user){
    const activeUser = await User.update({ password: user.hash }, {
  where: {
    email: user.email
  }
});

}

async function getUser(loginRequest){
    const userToCheck = await User.findAll({
    where: {
    email: loginRequest.user,
  }
});
    return userToCheck
}


async function updateUserInformation(user){
  console.log(user.password)
  // const obj = {}
  // Object.entries(user).filter(([key]) => user[key] != null && key != "id").forEach(function([key, value]){
  //   obj[key] = value
  // })
  const obj = Object.entries(user)
    .reduce((output, [key, value]) => Object.assign({},
      output,
      value != null && key !== 'id' && { [key]: value }
    ), {})

  obj.password = user.password
  console.log(obj)
  // const userUpdated = 
  //   await User.update(obj, {
  //     where: {
  //       id: +user.id
  //     }
  //   });
  // console.log(userUpdated)
  // return userUpdated
}
module.exports = {
    createUser,
    checkUserInDB,
    activateUser,
    getUser, 
    updateUserInformation
}