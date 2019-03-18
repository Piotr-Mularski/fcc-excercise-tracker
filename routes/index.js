const express = require('express');
const userController = require('./../controlers/userController');
const excerciseController = require('./../controlers/excerciseController');
const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(process.cwd() + '/views/index.html');
});

router.post('/api/excercise/new-user', userController.createUser);

router.get('/api/excercise/log', excerciseController.getExcercises);

router.post('/api/excercise/add', excerciseController.addExcercise);
module.exports = router;
