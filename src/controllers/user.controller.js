const bcrypt    = require('bcrypt');
const CONFIG    = require("../configs/config");
const User      = require('../models/users.model');
const {
    createResponseBody
}               = require("../commons/utilities");

exports.findUsers = (req,res) =>{
    User.find({},CONFIG.COLS_USER,(err,user) => {
		if(err){
            res.status(400).json(createResponseBody(1001,err,[],1));
            return;	
		}
		if(!user){
			let msg = `No users found`;
            res.status(401).json(createResponseBody(1001,msg,[],1));	
            return;
		}else{
            let msg = "Users loaded successfully.";
            res.status(200).json(createResponseBody(1000,msg,user,0));
		}
	});
};

exports.findUserById = (req,res) => {
    User.findOne({
		_id: req.params.id
	},CONFIG.COLS_USER,(err,user) => {
		if(err){
            res.status(400).json(createResponseBody(1001,err,[],1));
            return;	
		}
		if(!user){
			let msg = `No user found by the id ${req.params.id}`;
            res.status(401).json(createResponseBody(1001,msg,[],1));	
            return;
		}else{
            let msg = "User details loaded successfully.";
            res.status(200).json(createResponseBody(1000,msg,user,0));
		}
	});
};

exports.findUserByLevel = (req,res) => {
    
    if(!CONFIG.ALLOWED_LEVELS.includes(req.body.level)){
        let msg = `${req.body.level} is an invalid authorization level`;
        res.status(400).json(createResponseBody(1001,msg,[],1));
        return;
    }

    User.find({
		level: req.body.level
	},CONFIG.COLS_USER,(err,user) => {
		if(err){
            res.status(400).json(createResponseBody(1001,err,[],1));	
            return;
		}
		if(!user){
			let msg = `No user found by the defined level ${req.params.level}`;
            res.status(401).json(createResponseBody(1001,msg,[],1));	
            return;
		}else{
            let msg = "Users successfully loaded.";
            res.status(200).json(createResponseBody(1000,msg,user,0));
		}
	});
};