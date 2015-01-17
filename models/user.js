var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')

var userSchema = mongoose.Schema({
    runkeeperID: Number,
    accessToken: String
});

userSchema.plugin(findOrCreate);
var User = mongoose.model('User', userSchema);

module.exports = User;
