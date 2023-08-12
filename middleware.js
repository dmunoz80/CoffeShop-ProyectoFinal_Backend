const { json } = require('express');
const jwt = require('jsonwebtoken');

const vrfData = (req, res, next) => {
    const {firstName,lastName,address,email,password} = req.body;
    if (!firstName || !lastName || !address || !email || !password) {
        console.log('Todos los datos son obligatorios')
        return res.status(400).json({ mensaje: 'Todos los datos son obligatorios' });
    }
    console.log('Ingreso de datos OK');
    next();
}

const vrfCredencial = (req, res, next) => {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
        console.log('correo y contraseña son obligatorios')
        return res.status(400).json({ mensaje: 'correo y contraseña son obligatorios' });
    }
    console.log('Credenciales OK');
    next();
}

const vrfToken = (req, res, next) => {
    try {
        const Authorization = req.header('Authorization');
        if(!Authorization) {
            return res.status(401).json({ mensaje: 'Token no existe' });
        }
        const token = Authorization.split('Bearer ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.body.user_id = payload.usuario.id;
        res.json(req.body);
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token No Válido' });
    }
}

module.exports = {
    vrfData,
    vrfCredencial,
    vrfToken
}