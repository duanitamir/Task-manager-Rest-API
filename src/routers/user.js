const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const {sendWellcomeEmail} = require('../emails/accounts');
const {sendCancellationEmail} = require('../emails/accounts');


const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb)
    {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Must be image in the right format'))
        }
        cb(undefined, true)
    }
});

router.get('/users/me',auth, async (req,res) => {
    res.send(req.user)
});

router.post('/users',async (req, res) => {

    const user = new User(req.body);

    try{
        const token = await user.generateAuthToken();
        await user.save();
        sendWellcomeEmail(user.email, user.name);
        res.status(201).send( {user,token} );
    }
    catch (e) {
        res.status(500).send(e)
    }
});

router.get('/users/login', async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({user ,token});
    }catch(e){
        console.log('error');
        res.status(400).send(e.message)
    }
});

router.post('/users/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter( (token) => {
            // The right token we search will deliver false , so it will be remove by the filter
            return token.token !== req.token
        });
        await req.user.save();
        res.send()
    }catch (e) {
        res.status(501).send('Logged out')
    }
});

router.post('/users/logoutAll', auth, async (req,res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send()
    }catch (e) {
        res.status(500).send('Logged out')
    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {

    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
    req.user.avatar = buffer;

    await req.user.save();
    res.send('Picture was uploded correctly: '+ req.file.originalname.split('.')[0])
}, (e, req, res, next) => {
    res.status(400).send({ error: e.message});
});

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send('Avatar correctly deleted!')
}, (e, req, res, next) => {
    res.status(400).send({error: e.message})
});

router.get('/users/:id/avatar',async (req,res) =>{

    try{
        const user = await User.findById(req.params.id);

        if(!user || !user.avatar){
             throw new Error()
        }
        res.set('Content-Type','image/png');
        console.log(user.avatar);
        res.send(user.avatar)

    }catch(e){
        res.status(404).send()
    }
});


router.patch('/users/me', auth, async (req, res) => {
    const allowUpdates = ['name', 'email', 'password', 'age'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every( (update) => allowUpdates.includes(update));
    try{
        //new : true - return the new value instead of the old
        //runValidator - check if its valid
        const user = await req.user;

        if(isValidOperation){
            updates.forEach((update) => user[update] = req.body[update]);
            await user.save();
            //const user = await User.findByIdAndUpdate(id, req.body,{ new : true ,runValidators: true} );
            //console.log(user);
            res.status(201).send(user)
        }
        else{
            res.status(400).send({error:'unvalid field'})
        }
    }catch(e){
        res.status(500).send(e)
    }
});

router.delete('/users/me', auth, async (req, res) => {

    try {
        await req.user.remove();
        sendCancellationEmail(req.user.email, req.user.name);
        res.status(201).send(req.user);
    }
    catch(e){
        res.status(500).send(e)
    }
});

module.exports = router;