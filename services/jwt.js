import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

function createToken(user, expiresIn) {
    const { id, username } = user;
    const payload = { id, username };
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: expiresIn });
}

function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET_KEY);
}

export default { createToken, verifyToken };