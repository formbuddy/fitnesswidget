var mongoose = require('mongoose');

var activitiesSchema = mongoose.Schema({
    runkeeperID: Number,
    updated: {type: Date, default: Date.now},
    items: [
              {
                  duration: Number, // in seconds
                  total_distance: Number, // in cm
                  has_path: Boolean,
                  entry_mode: String,
                  source: String,
                  start_time: Date,
                  total_calories: Number,
                  type: { type: String},
                  uri: String
              }
           ]
});

var Activities = mongoose.model('Activities', activitiesSchema);

module.exports = Activities;
