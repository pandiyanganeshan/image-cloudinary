const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Driver, validate} = require('../models/driver');
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// router.get('/me', auth, async (req, res) => {
//   const user = await User.findById(req.user._id).select('-password');
//   res.send(user);
// });

router.post('/',[auth,admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Driver.findOne({ phone: req.body.phone });
  if (user) return res.status(400).send('Driver already registered.');

  user = new Driver(_.pick(req.body, ['name', 'phone', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send("Driver created Sucessfully")

  // const token = user.generateAuthToken();
  // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router; 
