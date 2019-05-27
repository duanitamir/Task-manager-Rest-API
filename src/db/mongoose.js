const mongoose = require('mongoose');
const Task = require('./../models/task');

mongoose.connect(process.env.MONGODB_URI, {
    //correctly apply the url
    useNewUrlParser: true,
    //make sure that indexes are created when mongoose works with mongodb, allow access to data fast
    useCreateIndex: true,
    //
    useFindAndModify: false
}).then( () => {
    console.log('connected')
}).catch((e) => {
    console.log(e)
});

/*

const task = new Task({
    description: 'Washing the dishes',
});

task.save().then((task) => {
    console.log('Succeeded', task);
}).catch((e) => {
    return console.log('Error', e)
});
*/

