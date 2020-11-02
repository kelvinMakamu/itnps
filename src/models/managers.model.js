const mongoose  = require('mongoose');

const Schema    = mongoose.Schema;

const ManagerSchema = new Schema({
    manager_id : {
        type: Schema.ObjectId,
        ref: 'User',
        required: 'Manager required'
    },
    agent_id : {
        type: Schema.ObjectId,
        ref: 'User',
        required: 'Agent required'
    },
}, { timestamps: true });

let Manager = mongoose.model('Manager',ManagerSchema);

module.exports = Manager;