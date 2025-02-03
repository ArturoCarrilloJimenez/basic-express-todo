var express = require('express');
var router = express.Router();
const taskController = require('../controller/taskController')

router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTask);
router.post('/', taskController.createTask);
router.put('/', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
