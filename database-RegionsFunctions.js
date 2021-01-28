const {Sequelize, DataTypes} = require("sequelize")
const {Region, Country, City} = require('./database-models')

async function getAllLocations(){ 
    const regionsTable = await Region.findAll({
    attributes: ['name'],
    foreignKey: 'RegionId',
    include: {
        all: true,
        nested: true,
        required: true
    }
    },
    );
    console.log(JSON.stringify(regionsTable))


}

async function addNewLocation(model, name){
    switch(model) {
        case 'Region': const newRegion = await Region.create({ name: name});
            console.log(newRegion)
            break;
        case 'Country': const newCountry = await Country.create({ name: name}); 
            console.log(newCity)
            break;
        case 'City': const newCity = await City.create({ name: name});
            console.log(newCity)
            break;
      }
   
}

module.exports = {getAllLocations, addNewLocation}

