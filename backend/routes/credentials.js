const express = require('express');
const route = express.Router();
const Fields = require('../models/loginStorage');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const dashboardAuth = require('../middleware/middle');

route.post('/login', async (req,res) => {
const {username,password} = req.body;
/* first locates succesful user existence in db, else returns*/
try {
const inDB = await Fields.findOne({username});
if (!inDB) {
    res.status(401).json({message: 'need to create account'});
}
/* built in function in schema function that will compare password in DB with given password */
const match = await inDB.compare(password);
if (!match) {
    res.status(401).json({message: 'Invalid password. Please try again'});
}
/* signs off token and sends token to user if correct user + password */
const token = jwt.sign({id: inDB._id,
    userID: username},process.env.JWT_SECRET, {expiresIn: '1hr'});
res.status(200).json(token);
}
catch (error) {
    res.status(500).json({message: error.message});
}
});
 
route.post('/register', async (req,res) => {
const {username,password} = req.body;
/* if username is found in db, return without re-registering*/
const inDB = Fields.findOne({username});
if (inDB) {
    res.status(401).json({message: 'Account already exists'});
}
/* try to save data in Fields schema, else server error */ 
try {
    const newUser = new Fields(req.body);
    await newUser.save();
    res.status(201).json({message: 'Succesfully created account!'});
}
catch (error) {
    res.status(500).json({message: error.message});
}
});
/* calls middleware function that verifies token and then sends back data*/
route.get('/dashboard', dashboardAuth, async (req,res) => {
    res.status(200).json({message: 'Succesfully loaded dashboard',
                          userInfo: req.user,})}

);
module.exports = route;