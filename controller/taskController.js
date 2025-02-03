const taskController = {}

const con = require('../db/mysql')

// TODO realizar validaciones de los campos

taskController.getTasks = (req, res) => {
    con.query('SELECT * FROM task', (err, rows) => {
        if (err) throw err
        res.status(200).json(rows)
    })
}

taskController.getTask = (req, res) => {
    const { id } = req.params
    con.query('SELECT * FROM task WHERE id = ?', [id], (err, rows) => {
        if (err) throw err
        res.status(200).json(rows)
    })
}

taskController.createTask = (req, res) => {
    const { title, description, completed, userId } = req.body
    con.query('INSERT INTO `task`(`title`, `description`, `completed`, `userId`) VALUES (?, ?, ?, ?)', [title, description, completed, userId], (err, rows) => {
        if (err) throw err
        res.status(200).json({response: 'Insercion realizada con exito'})
    })
}

taskController.deleteTask = (req, res) => {
    const { id } = req.params
    con.query('DELETE FROM task WHERE id = ?', [id], (err, rows) => {
        if (err) throw err
        res.status(200).json({response: 'Borrado realizada con exito'})
    })
}

taskController.updateTask = (req, res) => {
    const { id, title, description, completed } = req.body
    con.query('UPDATE task SET title = ?, description = ?, completed = ? WHERE id = ?', [title, description, completed, id], (err, rows) => {
        if (err) throw err
        res.status(200).json({response: 'Modificaccion realizada con exito'})
    })
}

taskController.getTasksByUser = (req, res) => {
    const { userId } = req.params
    con.query('SELECT * FROM task WHERE userId = ?', [userId], (err, rows) => {
        if (err) throw err
        res.status(200).json(rows)
    })
}

module.exports = taskController