const mongoose = require('mongoose');
const moment = require('moment');
const ExerciseModel = require('./../models/ExerciseModel');
const UserModel = require('../models/UserModel');

// TODO: refactor this block to Promises/async-await 
exports.addExercise = (req, res) => {
	const user = UserModel.findById(req.body.userID, (err) => {
		if (err) {
			res.json({ error: 'cannot find user with this ID' });
		} else {
				const exerciseData = {
					...req.body,
					date: req.body.date ? moment(req.body.date, 'YYYY-MM-DD').toDate() : moment()
				}
				const exercise = new ExerciseModel(exerciseData);

				exercise.save((err, data) => {
					if (err) {
						console.error(err);
						res.json({ error: 'unabled to create exercise data' });
					} else {
						res.status(200).redirect('/')
					}
				});
			};
		});
	};
	
exports.getExercises = async (req, res) => {
	try {
		const user = await UserModel.findById(req.query.userid);
		const exercises = await ExerciseModel.find({ userID: req.query.userid});
		res.json( {
			user: user.username,
			exercises: exercises.map( exercise => ({ description: exercise.description, duration: exercise.duration, date: moment(exercise.date).format('Do MMMM YYYY') }))
		});
	} catch(err) {
		console.error(err);
		res.json({ error: 'cannot fetch the data' });
	}
}