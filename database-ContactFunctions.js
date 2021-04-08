const {Sequelize, DataTypes} = require("sequelize")
const {Contact, ContactChannel, ChannelSocialMedia, Preference, Company, City, Country, Region} = require('./database-models')

async function getContacts(){
    const contactsTable =  await Contact.findAll({
        include: {
            all: true,
            nested: true,
        },
        // include:{
        //     model:City,  
        //     include: {
        //         all: true, nested: true, required: true
        //         // model: Country,
        //         // nested: true,
        //         // include: {
        //         //     model: Region,
        //         //     nested: true,
        //         // }
        //     }
        // },        
        // include: {
        //     model: Company,
        //     nested: true
        // },
        // include:{
        //     model:ContactChannel,
        //     include: {
        //         all: true, nested: true
        //     }
        // }
    },
        );
    // const allContacts = JSON.stringify(contactsTable)
    // console.log(allContacts)
    return contactsTable
}

async function getContactChannels(){
    const contactChannelsArray = await ChannelSocialMedia.findAll();
    return contactChannelsArray
}
async function getContactPreferences(){
    const contactPreferenceArray = await Preference.findAll();
    return contactPreferenceArray
}
async function deleteContact(id){
    const contactToDelete =  await Contact.destroy({
        where: {
        id: id
        }
    })
}
async function searchContacts(register){
    const object = JSON.parse(register)
    const set = Object.entries(object).reduce((output, [key, value]) => value? Object.assign({}, output, { [key]: value }) : output, {})
    const contactsSearch = await Contact.findAll({
    where: 
        set    
    ,include: {
        all: true,
        nested: true,
    },});
    return contactsSearch

}
module.exports = {getContacts, getContactChannels, getContactPreferences, deleteContact, searchContacts}