var express = require('express');
var router = express.Router();
const db = require("../connectors/mongo");

const get = require("../utils/api").get;
const put = require("../utils/api").put;
const schema2data  = require("../utils/faker").schema2data;

router.post("/create", function(req, res) {
    const resource =  { resource: req.body.resource };

    // insert in resource list

    // insert the corresponding schema

    // create the corresponding collection


    db.create(resource, function(err, resp) {
        db.get("resource").insert(resource, function(err2, resp2){
            res.json(resp2)
        })
    });
});

function generate(schema, count){
    let objects = [];
    Number(count).times( function() {
        objects.push(schema2data(schema));
    });
    return objects;
}

function getSchema(resource, count){
    return new Promise( function(resolve, reject){
        get("schema", { name:  resource}).then( ( data) => {
            if(!data || !data.length){
                resolve([]);
            }
            console.log(data)
            let schema = data[0];
            const objs = generate(schema.schema, count);
            resolve(objs)
        }).catch( err => {
            reject(err)
        })
    })
}

function addOrRemove(resource, count){
    return new Promise( function(resolve, reject){

    if( count >= 0) {
        getSchema(resource, count).then( data => {
            if(data.length > 0) {
                data.forEach(element => {
                    put(resource, element);
                });

                resolve(data);
            }
        });
    } else {
        console.log("delete");
        resolve([]);

    }
});
}


router.post("/populate", function(req, res) {
    const resource =  req.body.resource;
    const count = req.body.count;
    get(resource).then(data => {
        const currentCount = data.length;
        addOrRemove(resource, count - currentCount).then( data => {
            console.log(">>", data)
            res.json(data);
        }).catch( err => {
            res.json({
                success: false
            })
        })

    }).catch( err => {
        res.json(err);
    })

    // db.create(resource, function(err, resp) {
    //     db.get("resource").insert(resource, function(err2, resp2){
    //         res.json(resp2)
    //     })
    // });
});


router.get("/resource", function(req, res){
    get("resource").then(resp => {
        res.json(resp)
    }).catch( err => {
        res.json(err);
    })
})

module.exports = router;




Number.prototype.times  = function(cb){
	for(let i = 0; i < this; i ++ ) {
		cb(i)
    }
}