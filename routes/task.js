import express from 'express';
var router = express.Router();
import taskController from '../controller/taskController.js';

router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTask);
router.post('/', taskController.createTask);
router.put('/', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.get('/user/:username', taskController.getTasksByUser);

export default router;
