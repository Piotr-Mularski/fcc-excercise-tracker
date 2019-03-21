const mongoose = require('mongoose');
const userModel = require('../models/UserModel');

exports.createUser = (req, res) => {
	const user = new userModel(req.body);
	user.save((err, data) => {
		if (err) {
			// console.error(err);
			res.json({ error: 'unabled to create user' });
		} else {
			res.json({
				id: data._id,
				username: data.username
			});
		}
	});
};