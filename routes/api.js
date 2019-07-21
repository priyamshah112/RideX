// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const Users = require('../models/Users')

router.get('/users',(req,res) => {
	
	Users.find()
	.then(users => {
		res.json({
			confirmation: 'success',
			data: users	
		})
	})
	.catch(err=>{
		res.json({
			confirmation: 'fail',
			message: err.message
		})	
	})

})

module.exports = router
