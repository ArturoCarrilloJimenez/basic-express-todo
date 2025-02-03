const moment = require('moment');
const jwt = require('../services/jwt');
require('dotenv').config();

function ansureAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'La petición no tiene la cabecera de autenticación' });
    }

    const token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        const payload = jwt.decodeToken(token);

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'El token ha expirado' });
        }
    } catch (ex) {
        return res.status(404).send({ message: 'Token no válido' });
    }

    req.user = payload;

    next();
}

module.exports = ansureAuth;
