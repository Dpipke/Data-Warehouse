const {Sequelize, DataTypes} = require("sequelize")
const {Contact, ContactChannel, ChannelSocialMedia, Preference} = require('./database-models')

async function getContacts(){
    const contactsTable =  await Contact.findAll({
        include: {
            all: true,
            nested: true,
            // required: true,
        }},
        );
    console.log(contactsTable)
}
module.exports = {getContacts}