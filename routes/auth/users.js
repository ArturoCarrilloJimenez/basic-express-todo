var express = require('express');
var router = express.Router();

const userController = require('../../controller/userController')
const { getTasksByUser } = require('../../controller/taskController')

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.put('/', userController.updateUser);

router.get('/task/:userId', getTasksByUser);

module.exports = router;
