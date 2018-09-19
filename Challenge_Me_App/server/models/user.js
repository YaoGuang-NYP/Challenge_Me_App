// models/user.js
var myDatabase = require('../controllers/database');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const User = sequelizeInstance.define('User', {
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        defaultValue: 'Guest',
        trim: true
    },
    points: {
        type: Sequelize.INTEGER,
        trim: true
    },
    regionId: {
        type: Sequelize.INTEGER,
        defaultValue:"123",
        trim: true
    },
    banStatus: {
        type: Sequelize.INTEGER,
        trim: true
    },
    lives: {
        type: Sequelize.INTEGER,
        trim: true
    },
    externalId: {
        type: Sequelize.STRING,
        defaultValue: '',
        trim: true
    },
});

// force: True will drop if 
User.sync({ force: false, logging: console.log }).then(() => {
    console.log("User table syned");
    User.upsert({
        userId: 1,
        username: "abc123",
        points: 0,
        regionId: 1,
        banStatus: 5,
        lives: 3,
        externalId: ""
    });
});

module.exports = sequelizeInstance.model("User", User);