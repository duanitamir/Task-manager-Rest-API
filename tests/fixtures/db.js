const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./../../src/models/user');
const Task = require('../../src/models/task');


const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();

const userOne = {
    _id : userOneId,
    name: 'Mike',
    email: 'mike@gmail.com',
    password: 'qhwdoquhd888888',
    tokens: [{
        token: jwt.sign({_id : userOneId}, process.env.JWT_SECRET)
    }]
};

const userTwo = {
    _id : userTwoId,
    name: 'Ronen',
    email: 'ronen@gmail.com',
    password: 'qhwdoquhd888888',
    tokens: [{
        token: jwt.sign({_id : userTwoId}, process.env.JWT_SECRET)
    }]
};

const taskOne = {
    _id : new mongoose.Types.ObjectId(),
    description: 'Test Task Description',
    completed: false,
    owner: userOneId
};

const taskTwo = {
    _id : new mongoose.Types.ObjectId(),
    description: 'second Test Task Description',
    completed: true,
    owner: userOneId
};

const taskThree = {
    _id : new mongoose.Types.ObjectId(),
    description: 'Third test Task Description',
    completed: false,
    owner: userTwoId
};



const setupDatabase = async ()=>{
    // Before each drop the database
    await User.deleteMany();
    await Task.deleteMany();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
    await new User(userOne).save();
    await new User(userTwo).save();
};

module.exports = {
    userOneId, userOne,
    userTwoId, userTwo,
    taskOne, taskTwo, taskThree,
    setupDatabase
};