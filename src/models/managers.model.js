const mongoose  = require('mongoose');

const Schema    = mongoose.Schema;

const ManagerSchema = new Schema({

});

let Manager = mongoose.model('Manager',ManagerSchema);

module.exports = Manager;