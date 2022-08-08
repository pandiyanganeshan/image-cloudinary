const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const number = require('joi/lib/types/number');
const env=require('dotenv').config()

const dutySchema = new mongoose.Schema({
  date: {
    type: Date,
    default:Date.now
    // required: true,
  },
  vehicleNo: {
    type: String,
    required: true,
  },
  busNo: {
    type: Number,
    required: true,
  },
  busRoute: {
    type: String,
    required: true,
  },
  driverName:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Driver'
 },
 driverPhone:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Driver'
 },
 busType:{
    type:String,
    required:true
 },
 driverType:{
    type:String,
    enum:['Regular','Acting']
 },
 actingPhone:{
    type:Number,
    required:function (){ return this.isPublished=='Acting'}
},
});


// dutySchema.methods.generateAuthToken = function() { 
//   const token = jwt.sign({ _id: this._id, }, process.env.SECRET_KEY);
//   return token;
// }

const Duty = mongoose.model('Duty', dutySchema);

function validateDriver(duty) {
  const schema = {
    date:Joi.date().iso().required(),
    
  
  };

  return Joi.validate(duty, schema);
}

exports.Driver = Driver; 
exports.validate = validateDriver;