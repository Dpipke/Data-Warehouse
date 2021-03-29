const {Sequelize, DataTypes} = require("sequelize")
const {Contact, ContactChannel, ChannelSocialMedia, Preference, Company} = require('./database-models')

async function getContacts(){
    const contactsTable =  await Contact.findAll({
        include: {
            all: true,
            nested: true,
        },
        include: {
            model: Company
        },
        include:{
            model:ContactChannel,
            include: {
                all: true, nested: true
            }
            // include:{
            //     model: ChannelSocialMedia
            // },
            // include:{
            //     model: Preference
            // }
        }
    },
        );
    // const allContacts = JSON.stringify(contactsTable)
    // console.log(allContacts)
    return contactsTable
}
module.exports = {getContacts}