const {Sequelize, DataTypes} = require("sequelize")
const {Region, Country, City, Company, User} = require('./database-models')

async function getAllRegisters(model){ 
    switch(model) {
        case 'Region': 
            const locationsTable =  await Region.findAll({
                attributes: ['name'],
                foreignKey: 'RegionId',
                include: {
                    model: Country,
                    // nested: true,
                    required: true,
                    include:{model: City, required: true}}},
                );
                // const allRegisters = JSON.stringify(locationsTable)
                // console.log(allRegisters)
                return locationsTable
        break;
        case 'Company': 
            const companiesTable = await Company.findAll({
                attributes: ['id','name', 'address', 'email', 'telephone','cityId'],
                foreignKey: 'city',
                include: {
                    all: true,
                    nested: true,
                    required: true}
                },
                );
                // const allCompanies = JSON.stringify(companiesTable)
                console.log(companiesTable)
                return companiesTable
        break;
        case 'User': 
        const usersTable = await User.findAll();
            // const allUsers = JSON.stringify(usersTable)
            // console.log(allUsers)
            return usersTable
        break;
            }

      }

async function updateRegister(model, register){
    const set = Object.keys(register).filter(key => register[key] != null && key != "id").map(key => `${key} : ${JSON.stringify(register[key])}`).join(",")
    console.log(set)
    // switch(model, set, register) {
    //     case 'Company': 
                const companyUpdated = 
                await Company.update({set}, {
                where: {
                    id: +register.id
                }
                });
                console.log(companyUpdated)
                return companyUpdated
        // break;

    // }
}

async function deleteRegister(model, id){
    switch(model){
        case 'Company':
            const companyToDelete =  await Company.destroy({
                where: {
                id: id
                }
            })
        break;
        case 'Region': 
            const regionToDelete =  await Region.destroy({
                where: {
                id: id
                }
            })
        break;
        case 'Country': 
            const countryToDelete =  await Country.destroy({
                where: {
                id: id
                }
            })
        break;
        case 'City': 
            const cityToDelete =  await City.destroy({
                where: {
                id: id
                }
            })
        break;
    }
}   
async function addNewLocation(model, name, id){
    switch(model) {
        case 'Region': const newRegion = await Region.create({ name: name});
            console.log(newRegion)
            break;
        case 'Country': const newCountry = await Country.create({ name: name, RegionId: id}); 
            console.log(newCountry)
            break;
        case 'City': const newCity = await City.create({ name: name, CountryId: id});
            console.log(newCity)
            break;
        case 'Company': const newCompany = await Company.create({ name: name.name, cityId: name.cityId, address: name.address, email: name.email, telephone: name.telephone});
            console.log(newCompany)
            break
      }
   
}

module.exports = {getAllRegisters, addNewLocation, updateRegister, deleteRegister}

