require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    allowExitOnIdle: true
})

const getUsers = async (correo) => {
    const { result } = await pool.query('SELECT id,nombre,apellido,direccion,correo,contrasena,img,Rol FROM usuarios WHERE correo = $1', [correo]);
    return result.rows[0];
}
const getUser = async (correo, contrasena) => {
    const query = 'SELECT nombre,apellido,direccion,correo,contrasena,img,Rol FROM usuarios WHERE correo = $1 AND contrasena = $2';
    const values = [correo, contrasena];
    const result = await pool.query(query, values);
    return result.rows.length>0 && result.rows[0];


}

const addUser = async (nombre,apellido,direccion,correo,contrasena,img,Rol) => {
    const user = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    if (user.rowCount > 0) {
        throw { code: 401, message: 'Email ya registrado' }
    }
    const query = 'INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)';
    const values = [nombre,apellido,direccion,correo,contrasena,img,Rol];
    const result = await pool.query(query, values);
    return result
};

const getPost = async () => {
    const query = 'SELECT * FROM comentarios';
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw new Error(error);
    }
  };

  const addPost = async (titulo,comentario) => {
    const query = 'INSERT INTO comentarios VALUES (DEFAULT, $1, $2) RETURNING *';
    const values = [titulo, comentario];
    const result = await pool.query(query, values);
    return result
  };

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
    getUser,
    addUser,
    getPost,
    getProduct,
    addProduct,
    addPost,
};
