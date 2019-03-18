const mongoose = require('mongoose');
const ExcerciseModel = require('./../models/ExcerciseModel');
const UserModel = require('./../models/UserModel');

exports.addExcercise = (req, res) => {
	const excercise = new ExcerciseModel(req.body);

	excercise.save((err, data) => {
		if(err) {
			console.error(err);
			res.json({ error: 'unabled to create excercise data' });
		} else {
			res.send(data)
		}
	});
};

exports.getExcercises = async (req, res) => {
	try {
		const user = await UserModel.findById(req.query.userid);
		const excercises = await ExcerciseModel.find({ userID: req.query.userid});
		res.json( {
			user: user.username,
			excercises: excercises.map( excercise => ({ description: excercise.description, duration: excercise.duration, date: excercise.date }))
		});
	} catch(err) {
		console.error(err);
		res.json({ error: 'cannot fetch the data' });
	}
}