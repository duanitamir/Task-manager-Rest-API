const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req,res,next) => {
    try {
        // Get Token from the header and clean the unwanted text
        const token = req.header('Authorization').replace('Bearer ', '');

        // Verify the given token by decode with the coding word we previously provided
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // After decoding, search user with this id and check if the given Token is in hes list of tokens
        const user = await User.findOne({ _id: decoded._id, 'tokens.token' : token});

        // No token found -> No user caught
        if(!user){
            throw new Error()
        }
        // Adding the relevant current token for authentication
        req.token = token;
        // Adding the User to the request after authentication
        req.user = user;
        // Pass on
        next()

    }catch (e) {
        res.status(401).send({error: 'Please Authenticate'})
        console.log(e.message);
    }

};

module.exports = auth;

