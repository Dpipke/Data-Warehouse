const {Sequelize, DataTypes} = require("sequelize");
const moment = require("moment");
const db = new Sequelize (process.env.DB, process.env.DBUSER, process.env.DBPASS,{
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: "mysql"
}
) 

const User = db.define('User', {
    id: {
        field: "id", 
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        field: "name", 
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        field:"lastname",
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        field: "email",
        type: DataTypes.STRING,
        allowNull: false
    },
    admin: {
        field: "admin",
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    password: {
        field: "password",
        type: DataTypes.STRING,
        allowNull: true
    }},
    {timestamps: false

});

const Region = db.define('Region', {
    id: {
        field: "id", 
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        field: "name", 
        type: DataTypes.STRING,
        allowNull: false
    }},    
    {timestamps: false

});

const Country = db.define('Country', {
    id: {
        field: "id", 
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true
    },
    RegionId: {
        field: "region_id", 
        type: DataTypes.INTEGER,
        allowNull: false, 
        foreignKey: true,
    },
    name: {
        field: "name", 
        type: DataTypes.STRING,
        allowNull: false
    }},
    {    timestamps: false
    }    
);

const City = db.define('City', {
    id: {
        field: "id", 
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true
    },
    CountryId: {
        field: "country_id", 
        type: DataTypes.INTEGER,
        allowNull: false, 
        foreignKey: true,
    },
    name: {
        field: "name", 
        type: DataTypes.STRING,
        allowNull: false
    }},
    {timestamps: false
    
});

const Company = db.define('Company', {
    id: {
        field: "id", 
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        field: "name", 
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        field: "address",
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        field: "email",
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone: {
        field: "telephone",
        type: DataTypes.INTEGER,
        allowNull: false
    },   
    cityId: {
        field:"cityId",
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true
    }, 
    },
    {timestamps: false

});

const Contact = db.define('Contact', {
    id: {
        field: "id", 
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        field: "name", 
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        field:"lastname",
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        field: "email",
        type: DataTypes.STRING,
        allowNull: false
    },
    CompanyId: {
        field: "company_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    position: {
        field: "position",
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        field: 'address',
        type: DataTypes.STRING,
        allowNull: true
    },
    CityId:{
        field:'cityId',
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true

    },
    interest: {
        field: 'interest',
        type: DataTypes.INTEGER,
        allowNull: true,
        foreignKey: true
    }
},
    {timestamps: false

});

const ContactChannel = db.define('contact_channels', {
    id: {
        field: "id", 
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true
    },
    contactId: {
        field: "contactId", 
        type: DataTypes.INTEGER,
        allowNull: false, 
        foreignKey: true
    },
    contactChannelSocialMediaId: {
        field: "contact_channel_id", 
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    user_account: { 
        field: 'user_account',
        type: DataTypes.STRING,
        allowNull: false
    },
    preferences_id: {
        field: "preferences_id", 
        type: DataTypes.INTEGER,
        allowNull: true,
        foreignKey: true
    }},
    {timestamps: false
    
});

const ChannelSocialMedia = db.define('contact_social_media', {
    id: {
        field: "id", 
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true,
        foreignKey: true
    },
    name: {
        field: "name", 
        type: DataTypes.STRING,
        allowNull: false, 
    },},
    {timestamps: false
    
});
const Preference = db.define('preferences', {
    id: {
        field: "id", 
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        field: "name", 
        type: DataTypes.STRING,
        allowNull: false, 
    }, },
    {timestamps: false
    
});

Region.hasMany(Country, {
  foreignKey: 'region_id'
});
Country.belongsTo(Region);

Country.hasMany(City, {
  foreignKey: 'country_id'
});
City.belongsTo(Country);

City.hasMany(Company, {
    foreignKey: 'id'
  });
Company.belongsTo(City);

Company.hasMany(Contact, {
    foreignKey: 'id'
})
Contact.belongsTo(Company) 

Contact.hasMany(ContactChannel, {
    foreignKey: 'id'
  });
ContactChannel.belongsTo(Contact);

ContactChannel.hasMany(ChannelSocialMedia, {
    foreignKey: 'id'
  });
// ChannelSocialMedia.belongsTo(ContactChannel);

ContactChannel.hasMany(Preference, {
    foreignKey: 'id'
  });
// Preference.belongsTo(ContactChannel);

City.hasMany(Contact,{
    foreignKey: 'id'
});
Contact.belongsTo(City)

module.exports = {User, Region, Country, City, Company, Contact, ChannelSocialMedia, Preference, ContactChannel}