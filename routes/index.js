import express from 'express';
var router = express.Router();

import taskRoutes from './task.js';
import usersRoutes from './auth/users.js';
import authRoutes from './auth/auth.js';

router.use('/task', taskRoutes);
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);

export default router;