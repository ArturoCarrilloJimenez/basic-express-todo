var express = require('express');
var router = express.Router();

const userController = require('../../controller/authController');
const auth = require('../../middleware/authenticated');

router.post('/login', userController.login);

router.get('/protected', [auth.ansureAuth], userController.protected);

module.exports = router;