var monk = require('monk');
var db = monk('localhost:27017/api_faker');



module.exports = db;

