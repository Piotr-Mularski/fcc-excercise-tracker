const express = require('express');
const userController = require('./../controlers/userController');

const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(process.cwd() + '/views/index.html');
});

router.post('/api/excercise/new-user', userController.createUser);
module.exports = router;
