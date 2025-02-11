import mysql from 'mysql';
const con = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'express'
})

export default con;