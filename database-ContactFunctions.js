const {Sequelize, DataTypes} = require("sequelize")
const {Contact, ContactChannel, ChannelSocialMedia, Preference, Company, City, Country, Region} = require('./database-models')

async function getContacts(){
    const contactsTable =  await Contact.findAll({
        include: {
            all: true,
            nested: true,
        }, 
    //     include:{
    //         model:City,  
    //         include: {
    //             // all: true, nested: true
    //             model: Country,
    //             nested: true,
    //             include: {
    //                 model: Region,
    //                 nested: true,
    //             }
    //         }
    //     },        
    //     include: {
    //         model: Company,
    //         exclude: {attributes:{exclude: ['CityId'] }}     
    //     },
    //     include:{
    //         model:ContactChannel,
    //         include: {
    //             all: true, nested: true
    //         }
    //     }
    },
        );
    const contacts = JSON.stringify(contactsTable)
    console.log(contacts)
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
async function createContact(data){
    const contact = await Contact.create({name: data.name, lastname: data.lastname, position: data.position, CompanyId: data.companyId, email: data.email, address: data.address, interest: data.interest, CityId: data.cityId});
    return contact.id
}

async function addContactChannel(data, id){
    data.contactChannels.forEach(async (item) => {
        const contactChannel = await ContactChannel.create({contactId: id, contactChannelSocialMediaId: +item.ContactChannel, user_account: item.userAccount})
    })
}

async function updateContact(contact, id){
    const obj = {}
    Object.entries(contact).filter(([key]) => contact[key] != null && contact[key] != "" && contact[key] != undefined  && key != "id").forEach(function([key, value]){
      obj[key] = value
    })
    console.log(obj)
    const contactUpdated = 
      await Contact.update(obj, {
        where: {
          id: id
        }
      });
    console.log(contactUpdated)
    return contactUpdated
  }
module.exports = {getContacts, getContactChannels, getContactPreferences, deleteContact, searchContacts, createContact, addContactChannel, updateContact}