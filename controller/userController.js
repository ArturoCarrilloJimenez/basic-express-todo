import bcrypt from 'bcrypt'

const userController = {}

import { populate } from "dotenv"
import Task from "../models/taskModel.js"
import User from "../models/userModel.js"


userController.getUsers = async (req, res) => {
    const users = await User.find()

    users ? res.status(200).json(users) :
        res.status(404).json({ response: 'Usuarios no encontrados' })
}

userController.getUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)

    user ? res.status(200).json(user) :
        res.status(404).json({ response: 'Usuario no encontrado' })
}

userController.createUser = async (req, res) => {
    const { username, password, fullname } = req.body

    const hasPassword = bcrypt.hashSync(password, 10)

    const newUser = new User({ username, password: hasPassword, fullname })
    newUser.save()

    newUser ? res.status(200).json({ response: 'Usuario creado con exito' }) :
        res.status(404).json({ response: 'Error al crear usuario' })
}

userController.deleteUser = async (req, res) => {
    const { id } = req.params

    const user = await User.findById(id).populate('task')

    if (user) {
        user.task.map(async (task) => {
            await Task.findByIdAndDelete(task._id)
        })

        await User.findByIdAndDelete(id)
    }

    user ? res.status(200).json({ response: 'Usuario eliminado con exito' }) :
        res.status(404).json({ response: 'Usuario no encontrado' })
}

userController.updateUser = async (req, res) => {
    const { username, password, fullname, id } = req.body

    const hasPassword = bcrypt.hashSync(password, 10)

    const user = await User.findByIdAndUpdate(id, { username, password: hasPassword, fullname })

    user ? res.status(200).json({ response: 'Usuario actualizado con exito' }) :
        res.status(404).json({ response: 'Usuario no encontrado' })
}


export default userController