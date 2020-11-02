const mongoose   = require('mongoose');
const bcrypt     = require('bcrypt');
const CONFIG     = require('../configs/config');

const Schema     = mongoose.Schema;

const UserSchema = new Schema({
    first_name : {
        type: String,
        minlength: 3,
        trim: true,
        lowercase: true,
        required: 'Please provide user first name'
    },
    last_name : {
        type: String,
        minlength: 3,
        trim: true,
        lowercase: true,
        required: 'Please provide user last name'
    },
    username : {
        type: String,
        minlength: 4,
        trim: true,
        index: true,
        required: 'Please provide the username'
    },
    email : {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
        required: 'Please provide user email address'
    },
    level : {
        type: Number,
        required: 'Please provide user level'
    },
    password : {
        type: String,
        minlength: 8,
        required: 'Please provide password'
    },
},{ timestamps: true });

UserSchema.pre('save', async function preSave(next) {
	const user = this;
	if(!user.isModified('password')){
		return next();
	}else{
		try{
			const hash    = await bcrypt.hash(user.password,CONFIG.SALT_ROUNDS);
			user.password = hash;
			return next();
		}catch(err){
			return next(err);
		}
	}
});

UserSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

let User = mongoose.model('User',UserSchema);

module.exports = User;