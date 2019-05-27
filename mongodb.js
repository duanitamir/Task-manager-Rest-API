
const {ObjectID, MongoClient} = require('mongodb');

const databaseName = 'task-manager';


MongoClient.connect(process.env.MONGODB_URL, {useNewUrlParser: true}, (error, client) => {
    if(error){
        return console.log(`Unable to connect to database`)
    }

    const db = client.db(databaseName);
    /*db.collection('users').find({name: 'Tamir'}).toArray((error, data) => {
        if(error){
            return console.log(error)
        }
        console.log(data)
    });
    db.collection('users').find({name: 'Tamir'}).count((error, data) => {
        if(error){
            return console.log(error)
        }
        console.log(data)
    });

    db.collection('tasks').findOne( { _id: new ObjectID('5cae14a074bfd688c2da2647')}, (error, data) => {
        if(error){
            return console.log(error);
        }
        console.log(data);
    })

    db.collection('tasks').find({ completed: false}).toArray((error, data) => {
        if(error){
            return console.log(error);
        }
        console.log(data)
    });*/
//Updating users age in collection, using id
    /*    db.collection('users').updateOne({_id : new ObjectID('5cae0a51fc8aad84cf0c2238')},{$inc:{age : -13}})
    .then((result) => {
        console.log(result)
    }).catch((reject) => {
        console.log(reject)
    })*/
//Update many
    /*db.collection('tasks').updateMany({ completed: false  },
        { $set: {
            completed: true
        } })
        .then(( result) => {
            console.log(result.modifiedCount)
    }).catch((reject) => {
        console.log('Error', reject)
    })*/
//Delete one
    /*db.collection('users').deleteOne({name: 'Misddadke'}).then((result) => {
        console.log(result)
    }).catch((reject) => {
        console.log(reject)
    });*/

    db.collection('users').deleteMany( {age: 23}).then((result) => {
        console.log(result)
    }).catch((reject) => {
        console.log(reject)
    })
});

