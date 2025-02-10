import moment from 'moment';
import jwt from '../services/jwt.js';
import dotenv from 'dotenv';

function ansureAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'La petición no tiene la cabecera de autenticación' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verifyToken(token);

    try {
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'El token ha expirado' });
        }
    } catch (ex) {
        console.log(ex);
        
        return res.status(404).send({ message: 'Token no válido' });
    }

    req.user = payload;

    next();
}

export default { ansureAuth};
