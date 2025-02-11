import mongoose from 'mongoose';
import dotenv from 'dotenv/config';

const bd = {}
bd.connect = () => {
    console.log('Conectando a la base de datos...');
    
    mongoose.connect(process.env.MONGO_URI)
    const con = mongoose.connection
    con.on('error', console.error.bind(console, 'Error de conexión: '))
    con.once('open', () => console.log('Conexión a la base de datos exitosa'))
}

export default bd;