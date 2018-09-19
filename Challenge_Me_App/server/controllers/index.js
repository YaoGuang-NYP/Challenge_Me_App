var User = require('../models/user');
var myDatabase = require('./database');
var sequelizeInstance = myDatabase.sequelizeInstance;

exports.show = function(req, res) {
    User.findAll({
        attributes: ["userId", "username", "points", "regionId", "banStatus", "lives", "externalId"]
    }).then( function (user) {
        res.render("index", {
            title: "Challenge Me Application",
            textButton: "Next" ,
            challenge: "Welcome",
            urlPath: req.protocol + "://" + req.get("host")  + req.url      
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
};