var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/muniButler');

var db = mongoose.connection;

db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Connected to db");
});

module.export = db; 