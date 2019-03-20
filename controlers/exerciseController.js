const mongoose = require('mongoose');
const moment = require('moment');
const ExerciseModel = require('./../models/ExerciseModel');
const UserModel = require('../models/UserModel');

// TODO: refactor this block to Promises/async-await
exports.addExercise = async (req, res) => {
	try {
		const user = await UserModel.findById(req.body.userID);
		if(!user) {
			res.send('no such user');
		} else {
			const exerciseData = {
				...req.body,
				date: req.body.date ? moment(req.body.date, 'YYYY-MM-DD').toDate() : moment()
			};
			const exercise = new ExerciseModel(exerciseData);
			const savedExercise = await exercise.save();
			res.status(201).json(savedExercise);
		}
	} catch(err) {
		console.error(err);
		res.json({ error: 'cannot save the data' });
	}
};

exports.getExercises = async (req, res) => {
	try {
		const { userid, from, to } = req.query;
		const limit = req.query.limit ? parseInt(req.query.limit, 10) : undefined;
		const user = await UserModel.findById(userid);
		let exercises = await ExerciseModel.find({ userID: req.query.userid }).sort({ date: -1 });

		exercises = exercises.filter((exercise) => {
			if(!!from && !moment(exercise.date).isSameOrAfter(from)) {
				return false;
			}
			if(!!to && !moment(exercise.date).isSameOrBefore(to)) {
				return false;
			}

			return true;
		});

		const formatedExercises = exercises.map((exercise) => {
			return {
				description: exercise.description,
				duration: exercise.duration,
				date: moment(exercise.date).format('Do MMMM YYYY')
			};
		}).slice(0, limit);

		res.json({
			user: user.username,
			count: formatedExercises.length,
			exercises: formatedExercises
		});
	} catch(err) {
		console.error(err);
		res.json({ error: 'cannot fetch the data' });
	}
};
