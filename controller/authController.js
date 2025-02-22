import bcrypt from 'bcrypt'

const authController = {}

import { populate } from "dotenv"
import User from "../models/userModel.js"
import jwt from '../services/jwt.js'

// Método que se encarga de validar si el usuario existe, comparando el username y password
authController.validateUser = async (username, password) => {
    return new Promise(async (res, rej) => {
        const data = await User.find({ username });

        // Una vez que se obtienen los datos del usuario, se compara la contraseña
        if (data.length > 0) {
            const user = data[0];
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res(user); // Contraseña correcta
                } else {
                    res(false); // Contraseña incorrecta
                }
            });
        } else {
            res(false); // Usuario no encontrado
        }
    });
};


authController.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await authController.validateUser(username, password);

    if (user) {
        const token = jwt.createToken(user, 60 * 60 * 24);
        res.status(200).json({ token, userId: user.id });
    } else {
        res.status(401).json({ message: 'Usuario o contraseña incorrecta' });
    }
}

authController.protected = async (req, res) => {
    res.status(200).json({ message: 'Ruta protegida, has accedido correctamente' });
}

export default authController