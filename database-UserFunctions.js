const {Sequelize, DataTypes} = require("sequelize")
const {User} = require('./database-models')


async function createUser(userProvided){
    const role = userProvided.admin === "Admin"
    const userToCreate = await User.create({name: userProvided.name, lastname: userProvided.lastname, email: userProvided.email, admin: role})
}

async function checkUserInDB(user){
    const role = user.admin === "Admin"
    const userToCheck = User.findAll({
    where: {
    email: user.email,
    admin: role
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

async function deleteUser(user){
    await User.destroy({
  where: {
    id: user.id
  }
})}
async function updateUserInformation(user){
  const set = Object.keys(user).filter(key => user[key] != null && key != "id").map(key => `${key} : ${JSON.stringify(user[key])}`).join(",")
  console.log(set)
  const userUpdated = 
  await User.update({set}, {
    where: {
      id: +user.id
    }
  });
  console.log(userUpdated)
  return userUpdated
}
module.exports = {
    createUser,
    checkUserInDB,
    activateUser,
    getUser, 
    deleteUser,
    updateUserInformation
}