const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');


const userSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        default: 0,
        type: Number,
        validate(value) {
            if(value < 0){
                throw new Error('Age must be positive number ')
            }
        }
    },
    email:{
        type: String,
        unique: true,
        required: true,
        //cleaning unnecessary spaces
        trim: true ,
        lowercase: true,
        validate(value) {
            if(!(validator.isEmail(value))){
                throw new Error('Email is unvalid')
            }
        }
    },
    password:{
        type : String,
        trim : true,
        required: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password can not contain the word "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    // Configuring a type allow storing the data with binary data in the database, alongside to user which it belongs to
    avatar: {
        type: Buffer
    }

}, {
    timestamps: true
});


// Hash Pass before saving

userSchema.pre('save',async function (next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next()
});


// Delete user tasks when user is deleted
userSchema.pre('remove',async function(next){
    const user = this;
    await Task.deleteMany({owner: user._id});
    next()
});

// Available on the Instances
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id : user._id.toString() },process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token
};


// Creating assosiation between two models, reference to the Task model, from local data, field _id, from foreign data(Task) the owner
userSchema.virtual('tasks',{
    ref:'Task',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.methods.toJSON = function () {
    const user = this.toObject();

    // Delete ( From the response, not from the Database) unnecessary data when convert to JSON
    delete user.password;
    delete user.token;
    delete user.avatar;

    return user
};

// Available on the Model for the User
userSchema.statics.findByCredentials = async function(email, password){

    const user = await User.findOne({email});
    if(!user){
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password ,user.password);

    if(!isMatch){
        throw new Error('Unable to login');
    }

    return user;
};

const User = mongoose.model('User', userSchema);


module.exports = User;