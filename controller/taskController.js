const taskController = {}

import { populate } from "dotenv"
import Task from "../models/taskModel.js"
import User from "../models/userModel.js"

// TODO realizar validaciones de los campos

taskController.getTasks = async (req, res) => {
    const result = await Task.find()
    res.status(200).json(result)
}

taskController.getTask = async (req, res) => {
    const { id } = req.params
    const task = await Task.findById(id)

    task ? res.status(200).json(task) :
        res.status(404).json({ response: 'Tarea no encontrada' })
}

taskController.createTask = async (req, res) => {
    const { title, description, completed, userId } = req.body
    const newTask = new Task({ title, description, completed, userId })
    newTask.save()

    if (newTask) {
        // Agregar la tarea al usuario
        const user = await User.findById(userId)
        user.task.push(newTask._id)
        user.save()
    }

    newTask ? res.status(200).json({ response: 'Tarea creada con éxito' }) :
        res.status(400).json({ response: 'Error al crear la tarea' })
}

taskController.deleteTask = async (req, res) => {
    const { id } = req.params
    const task = await Task.findById(id)

    if (task) {
        // Eliminar la tarea del usuario
        const user = await User.findById(task.userId)
        user.task.pull(task._id)
        user.save()

        // Eliminar la tarea
        await Task.findByIdAndDelete(id)
    }

    task ? res.status(200).json({ response: 'Tarea eliminada con éxito' }) :
        res.status(404).json({ response: 'Tarea no encontrada' })
}

taskController.updateTask = async (req, res) => {
    const { id, title, description, completed } = req.body
    const task = await Task.findByIdAndUpdate(id, { title, description, completed })

    task ? res.status(200).json({ response: 'Tarea actualizada con éxito' }) :
        res.status(404).json({ response: 'Tarea no encontrada' })
}

taskController.getTasksByUser = async (req, res) => {
    const { username } = req.params

    const userTasks = await User.find({ username }).populate('task')

    userTasks ? res.status(200).json(userTasks) :
        res.status(404).json({ response: 'Usuario no encontradas' })
}

export default taskController