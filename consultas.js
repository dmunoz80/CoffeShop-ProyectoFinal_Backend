const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '898998',
    database: 'proyectofinal_grupo_4',
    allowExitOnIdle: true
})

const getUsers = async (correo) => {
    const { result } = await pool.query('SELECT id,nombre,apellido,direccion,correo,contraseña,img,Rol FROM usuarios WHERE correo = $1', [correo]);
    return result.rows[0];
}

const addUser = async (nombre,apellido,direccion,correo,contraseña,img,Rol) => {
    const user = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    if (user.rowCount > 0) {
        throw { code: 401, message: 'Email ya registrado' }
    }
    const query = 'INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)';
    const values = [nombre,apellido,direccion,correo,contraseña,img,Rol];
    const result = await pool.query(query, values);
    return result
}

const verifyUser = async (correo, contraseña) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    const user = result.rows[0];
    const passwordEncoded = user.contraseña;
    const isPasswordCorrect = bcrypt.compareSync(contraseña, passwordEncoded);
    if (!isPasswordCorrect) {
        throw { code: 401, message: 'Email o contraseña incorrecta' }
    } else {
        return result.rows;
    }
}

const getPost = async () => {
    const { rows } = await pool.query("SELECT * FROM comentarios")
    return rows
}

const addPost = async (nombre, comentario) => {
    const query = "INSERT INTO comentarios VALUES (DEFAULT, $1, $2)"
    const values = [nombre, comentario]
    const result = await pool.query(query, values)
    return result
}

const getProduct = async () => {
    const { rows } = await pool.query("SELECT * FROM productos")
    console.log(rows)
    return rows
}

const addProduct = async (nombre,descripcion,precio,imagen) => {
    const query = "INSERT INTO productos VALUES (DEFAULT, $1, $2, $3, $4)"
    const values = [nombre, descripcion, precio, imagen]
    const result = await pool.query(query, values)
    return result
}

module.exports = {
    getUsers,
    addUser,
    getPost,
    addPost,
    getProduct,
    addProduct,
    verifyUser
}
