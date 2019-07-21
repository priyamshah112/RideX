const mongoose = require('mongoose')

const Users = new mongoose.Schema({
	name: {type:String, trim:true, defualt:''},
	phno: {type:String, trim:true, defualt:''},
	user_type: {type:String, trim:true, defualt:''},
	email: {type:String, trim:true, defualt:''},
	username: {type:String, trim:true, defualt:''},
	password: {type:String, trim:true, defualt:''},
	vehicle: {type:String, trim:true, defualt:''},
	vehicle_no: {type:String, trim:true, defualt:''},
	lat: {type:String, trim:true, defualt:''},
	long: {type:String, trim:true, defualt:''}
})

module.exports = mongoose.model('Users',Users)

