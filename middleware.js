const jwt = require('jsonwebtoken');

const vrfData = (req, res, next) => {
    const { nombre,apellido,direccion,correo,contraseña,img,Rol } = req.body;
    if (!nombre || !apellido || !direccion || !correo || !contraseña || !img || !Rol) {
        console.log('Todos los datos son obligatorios')
        return res.status(400).json({ mensaje: 'Todos los datos son obligatorios' });
    }
    console.log('Ingreso de datos OK');
    next();
}

const vrfCredencial = (req, res, next) => {
    const { correo, contraseña } = req.body;
    console.log(req)
    if (!correo || !contraseña) {
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
        const verifyToken = jwt.verify(token, "AA_XX");
        req.data = verifyToken;
        console.log('Token OK');
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