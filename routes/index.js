const express = require('express');
const userController = require('./../controlers/userController');
const excerciseController = require('./../controlers/excerciseController');
const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(process.cwd() + '/views/index.html');
});

router.get('/api/excercise/log', (req, res) => {
	res.send(req.query);
});

router.post('/api/excercise/new-user', userController.createUser);
module.exports = router;

router.post('/api/excercise/add', excerciseController.addExcercise);
module.exports = router;

