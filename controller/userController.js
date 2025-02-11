import bcrypt from 'bcrypt'

const userController = {}

import con from '../db/mysql.js'

// TODO realizar validaciones de los campos

userController.getUsers = (req, res) => {
    con.query('SELECT * FROM user', (err, rows) => {
        if (err) throw err
        res.status(200).json(rows)
    })
}

userController.getUser = (req, res) => {
    const { id } = req.params
    con.query('SELECT * FROM user WHERE id = ?', [id], (err, rows) => {
        if (err) throw err
        res.status(200).json(rows)
    })
}

userController.createUser = async (req, res) => {
    const { username, password, fullname } = req.body

    const hasPassword = await bcrypt.hashSync(password, 10)

    con.query('INSERT INTO `user`(`username`, `password`, `fullname`) VALUES (?, ?, ?)', [username, hasPassword, fullname], (err, rows) => {
        if (err) throw err
        res.status(200).json({response: 'Insercion realizada con exito'})
    })
}

userController.deleteUser = (req, res) => {
    const { id } = req.params
    con.query('DELETE FROM user WHERE id = ?', [id], (err, rows) => {
        if (err) throw err
        res.status(200).json({response: 'Borrado realizada con exito'})
    })
}

userController.updateUser = (req, res) => {
    const { username, password, fullname, id } = req.body

    const hasPassword = bcrypt.hashSync(password, 10)

    con.query('UPDATE user SET username = ?, password = ?, fullname = ? WHERE id = ?', [username, hasPassword, fullname, id], (err, rows) => {
        if (err) throw err
        res.status(200).json({response: 'Modificaccion realizada con exito'})
    })
}


export default userController