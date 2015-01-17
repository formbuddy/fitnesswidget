var User = require('../models/user.js');
var Activities = require('../models/activities.js');
var request = require('request');
var Config = require('../credentials.js');

exports.get = function(res, id){
    User.findById(id, function(err, user){
        if(err){
            console.log(err);
            res.status(500).send('An error occurred');
            return err;
        }
        if(!user){
            res.status(404).send('User not found');
            return;
        }

        var rkapi = Config.rkapi;
        var reqopts = {
            url: rkapi + '/fitnessActivities',
            qs: { access_token: user.accessToken },
            gzip: true
        };

        request.get(reqopts, function(error, response, body){
            if(error || response.statusCode != 200){
                console.log("Error from RK request: " + error);
                res.status(500).send('Unabe to fetch details from RK API');
                return error;
            }
            var bjson;
            try{
                bjson = JSON.parse(body);
            }
            catch(err){
                console.log("JSON parsing failed: " + err);
                return err;
            }
            var items = bjson.items;
            console.log("items %j", items);
            Activities.update({runkeeperID: user.runkeeperID},{$set: {items: items}}, {upsert: true}, function(err, numAffected){
                if(err){
                    console.log("Error updating: " + err);
                    res.status(500).send("DB error");
                    return err;
                }
                res.status(200);
                res.send(items);
            });
        });
    });
}
