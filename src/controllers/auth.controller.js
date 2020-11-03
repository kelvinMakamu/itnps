const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const CONFIG    = require("../configs/config");
const User      = require('../models/users.model');
const { 
   createResponseBody
 }              = require("../commons/utilities");

const loginRequired = (req,res,next) => {
	if(req.user){
		next();
	}else{
        let msg = "Unauthorized user";
		res.status(401).json(createResponseBody(1001,msg,[],1));
		return;
	}
}

const registerUser = (req,res) => {
	const invalid = !req.body.first_name || !req.body.last_name ||
	 !req.body.username || !req.body.email || !req.body.password;
	 
    if(invalid){
        let msg = "Please provide all details";
		res.status(401).json(createResponseBody(1001,msg,[],1));
		return;
    }
	const user  = new User(req.body);
	user.save((err,user) => {
		if(err){
			res.status(400).json(createResponseBody(1001,err,[],1));
			return;	
		}else{
			user.password = undefined;
			let msg = "User registered successfully.";
	  	    res.status(200).json(createResponseBody(1000,msg,[],1));	
		}
	});
}

const login = (req,res) => {
	User.findOne({
		email: req.body.email
	},(err,user)=> {
		if(err){
			res.status(400).json(createResponseBody(1001,err,[],1));	
			return;
		}
		if(!user){
			let msg = "Authentication failed. No user found";
			res.status(401).json(createResponseBody(1001,msg,[],1));
			return;	
		}else{
			if(!bcrypt.compare(req.body.password,user.password)){
				let msg = "Authentication failed. Invalid email/password";
				res.status(401).json(createResponseBody(1001,msg,[],1));
				return;
			}else{
				let token = {
                    access_token: jwt.sign({ email: user.email, username: user.username, _id:user._id},
                        CONFIG.SECRET)
				};
				let msg = "User authenticated successfully";
		  	    res.status(200).json(createResponseBody(1000,msg,token,0));
			}
		}

	});
}

const resetPassword = (req, res) =>{

}

const logoutUser    = (req, res) =>{

}

const isValidToken = (req,res,next) => {
	if(req.headers['authorization']){
		try{
			let authorization = req.headers['authorization'].split(' ');
			if(authorization[0] !== 'Bearer') {
				req.user = undefined;
				next();
			}else{
				jwt.verify(authorization[1],CONFIG.SECRET,(err,decode) =>{
					if(err){
						req.user = undefined;
					}
					req.user = decode;
					next();
				});
			}
		}catch(err){
			req.user = undefined;
			next();
		}
	}else{
			req.user = undefined;
			next();
	}
};

module.exports = {
	login,
	isValidToken,
	registerUser,
	loginRequired,
	resetPassword,
	logoutUser
}
