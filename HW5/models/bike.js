var credentials = require("../lib/credentials.js");
var mongoose = require("mongoose");

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }  } };
mongoose.connect(credentials.mongo.development.connectionString, options);

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));  

var bikeSchema = mongoose.Schema({
    brand: String,
    model: String,
    size: String,
});

module.exports = mongoose.model('Bike', bikeSchema);