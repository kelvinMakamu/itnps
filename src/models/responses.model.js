const mongoose  = require('mongoose');

const Schema    = mongoose.Schema;

const ResponseSchema = new Schema({

});

let Response = mongoose.model('Response',ResponseSchema);

module.exports = Response;