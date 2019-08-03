const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/task');
const User = require('../models/user');

router.post('/tasks', auth, async (req, res) => {

    const task = new Task({
        ...req.body,
        owner: req.user._id,
        completed: false
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(500).send(e.message)
    }

    /*   task.save().then(() => {
           res.status(201).send(task);
           console.log(task);
       }).catch((e) => {
           res.status(400).send(e)
       })
     */
});

// GET/task?completed=false
// limit and skip, for pagination
// GET/task?limit=10&skip=10
// GET/tasks?sortBy=createdAt:asc /desc

router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    //const owner = await User.findById(req.user._id);
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            //Limits the result
            options: {
                // if limit will not be provided , will be ignored by mongoose
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip) * parseInt(req.query.limit),
                // sorts the tasks by created at, 1 newest, -1 oldest
                //createdAt: 1,
                //sorts the tasks by completed -1 true or 1 false
                sort

            }
        }).execPopulate();

        if (!req.user.tasks) {
            res.status(401).send('No Tasks found')
        }
        res.status(200).send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }

    /*
        Task.find({}).then((tasks) => {
            console.log(tasks);
            res.status(200).send(tasks)
        }).catch( (e) => {
            res.status(500).send(e)
        })*/

});

router.get('/tasks/:id', auth, async (req, res) => {

    const _id = await req.params.id;

    try {
        const task = await Task.findOne({_id, owner: req.user._id});
        res.status(200).send(task);
    } catch (e) {
        res.status(500).send(e);
    }

    /*
        Task.findById(_id).then((task) => {
            res.status(200).send(task);
        }).catch( (e) => {
            console.log(task);
            res.status(500).send('Error Accured');
        })*/
});

router.patch('/tasks/:id', auth, async (req, res) => {


    const validUpdates = ['description', 'completed'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => validUpdates.includes(update));

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});


        if (!task) {
            return res.status(404).send({error: "No task with this ID found."})
        }

        updates.forEach((update) => task[update] = req.body[update]);
        task.save();
        res.status(200).send(task);
    } catch (e) {
        res.status(500).send(e.message)
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    console.log(req.params.id);
    try {
        console.log('user id from router  ',req.user._id)
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});

        if (!task) {
            res.status(404).send({msg: 'No Task with this ID'})
        }
        console.log('successfully Deleted');
        res.status(201).send(task)
    } catch (e) {
        return res.status(500).send(e)
    }
});

module.exports = router;