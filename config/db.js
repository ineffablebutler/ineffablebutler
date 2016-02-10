var mongoose = require('mongoose');

var url = process.env.MONGOLAB_URI || 'mongodb://localhost/muniButler';
mongoose.connect(url);

var db = mongoose.connection;

db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Connected to db");
});

module.export = db; 