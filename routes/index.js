var express = require('express');
var routeWrapper = express.Router();
var router = express.Router();

const prefix = "/api/v1/";

const db = require("../connectors/mongo");
const makeRoutes = require("../utils/api").makeRoutes;

function getCollections(){
  return new Promise(function(resolve, reject){
    db.get("resource").find({}, {}, function(err, data){
      if( err ){
        reject(err);
      }
      resolve(data);
    })
  })
}

getCollections().then( resources => {
    resources.map( resource => {
      console.log("Making Routes for :: ", resource.name)
      router.use(makeRoutes(resource.name));
    })
}).catch(console.error)


console.log(router)
module.exports = routeWrapper.use(prefix, router);
