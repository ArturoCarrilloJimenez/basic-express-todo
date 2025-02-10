import express from 'express';
var router = express.Router();

import authController from '../../controller/authController.js';
import auth from '../../middleware/authenticated.js';

router.post('/login', authController.login);

router.get('/protected', [auth.ansureAuth], authController.protected);

export default router;