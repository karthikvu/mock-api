var express = require('express');
const db = require("../connectors/mongo");

function query(){

}

function makeResource(resource){
    return db.get(resource);
}


function makeRoutes(resource){
    var routeWrapper = express.Router();
    var router = express.Router();

    console.log("Make routes : ", resource);
    const _resource = makeResource(resource);

    router.get("/", function(req, res){
        _resource.find({}, {}, (e, d) => {
            res.json(d);
        }) 
    })
    router.get("/:id", function(req, res){
        _resource.find({ id:req.params.id   }, {}, (e, d) => {
            res.json(d);
        }) 
    })

    router.post("/", function(req, res){
        _resource.insert(req.body).then( resp => {
            res.json(resp)
        })
    })


    return routeWrapper.use("/" + resource, router);
}

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
  function get(collection, options = {}){
    return new Promise(function(resolve, reject){
      db.get(collection).find(options, {}, function(err, data){
        if( err ){
          reject(err);
        }
        resolve(data);
      })
    })
  }
  function put(collection, obj){
    return new Promise(function(resolve, reject){
      db.get(collection).insert(obj, function(err, data){
        if( err ){
          reject(err);
        }
        resolve(data);
      });
    })
  }
    

module.exports = {
    makeRoutes,
    get,
    put
}