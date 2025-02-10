import express from 'express';
var router = express.Router();

import userController from '../../controller/userController.js';
import taskController from '../../controller/taskController.js';

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.put('/', userController.updateUser);

router.get('/task/:userId', taskController.getTasksByUser);

export default router;

