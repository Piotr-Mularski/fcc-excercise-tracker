const mongoose = require('mongoose');
const ExcerciseModel = require('./../models/ExcerciseModel');

exports.addExcercise = (req, res) => {
	const excercise = new ExcerciseModel(req.body);

	excercise.save((err, data) => {
		if(err) {
			console.error(err);
			res.json({ error: 'unabled to create excercise data' });
		} else {
			res.send(data)
		}
	})

}