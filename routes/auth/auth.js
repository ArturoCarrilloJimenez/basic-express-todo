var express = require('express');
var router = express.Router();

const userController = require('../../controller/authController');

router.post('/login', userController.login);


module.exports = router;