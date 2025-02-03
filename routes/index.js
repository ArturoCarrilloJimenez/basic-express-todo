var express = require('express');
var router = express.Router();

const taskRoutes = require('./task')
const usersRoutes = require('./auth/users')
const authRoutes = require('./auth/auth')

router.use('/task', taskRoutes);
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);

module.exports = router;