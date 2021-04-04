const {Sequelize, DataTypes, json} = require("sequelize")
const {Region, Country, City, Company, User, Contact, ChannelSocialMedia, Preferency} = require('./database-models')

async function getAllRegisters(model, id){ 
    switch(model) {
        case 'Region': 
            const regionsData = await Region.findAll({});
            const countriesData = await Country.findAll({});
            const citiesData = await City.findAll({});
            return [regionsData, countriesData, citiesData]

        break;
        case 'Country': 
        const countriesArray = await Country.findAll({
            where:{
                RegionId: id
            }
        });
        return countriesArray

        break;
        case 'City': 
        const citiesArray = await City.findAll({
            where:{
                CountryId: id
            }
        });
        return citiesArray

        break;
        case 'Company': 
            const companiesTable = await Company.findAll({
                // attributes: ['id','name', 'address', 'email', 'telephone','cityId'],
                // foreignKey: 'city',
                include: {
                    model: City,
                    include:{
                        model: Country,
                        include:{
                            model: Region
                        }
                    }
                    // all: true,
                    // nested: true,
                    // required: true
                }
                },
                );
                // const allCompanies = JSON.stringify(companiesTable)
                // console.log(allCompanies)
                return companiesTable
        break;
        case 'User': 
        const usersTable = await User.findAll();
            // const allUsers = JSON.stringify(usersTable)
            // console.log(allUsers)
            return usersTable
    }

}

async function updateRegister(model, register){
    const set = Object.keys(register).filter(key => register[key] != null && key != "id").map(key => `${key} : ${JSON.stringify(register[key])}`).join(",")
    console.log(set)
    const setProperties = set.split(',')
    const obj = {}
    setProperties.forEach(function(setProperties){
        const setValues = setProperties.split(':')
        obj [setValues[0]] = setValues[1]
  })
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

            // const countryIdDependentOnRegionToDelete =  await Country.findAll({
            //     where: {
            //     RegionId: id
            //     }
            // })
            // console.log(countryIdDependentOnRegionToDelete)
            // const countryDependentOnRegionToDelete =  await Country.destroy({
            //     where: {
            //     RegionId: id
            //     }
            // })
            // const regionToDelete =  await Region.destroy({
            //     where: {
            //     id: id
            //     }
            // })
        break;
        case 'Country': 
            const citiesdependentOnCountryToDelete =  await City.destroy({
                where: {
                CountryId: id
                }
            })
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
        case 'User': 
        const userToDelete =  await User.destroy({
            where: {
            id: id
            }
        })
        break;
    }
}   
async function addNewRegister(model, name, id){
    console.log(name)
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

module.exports = {getAllRegisters, addNewRegister, updateRegister, deleteRegister}

