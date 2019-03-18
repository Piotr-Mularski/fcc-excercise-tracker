const express = require('express');
const userController = require('./../controlers/userController');
const exerciseController = require('./../controlers/exerciseController');
const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(process.cwd() + '/views/index.html');
});

router.post('/api/exercise/new-user', userController.createUser);

router.get('/api/exercise/log', exerciseController.getExercises);

router.post('/api/exercise/add', exerciseController.addExercise);
module.exports = router;
