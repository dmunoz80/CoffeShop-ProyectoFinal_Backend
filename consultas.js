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

//-------------Consultas relacionadas a usuarios-----------------------

const getUser = async (correo) => {
    const query = 'SELECT id,nombre,apellido,direccion,correo,contrasena,img,Rol FROM usuarios WHERE correo = $1';
    const values = [correo];
    const result = await pool.query(query, values);
    return result.rows.length>0 && result.rows[0];
}
//-------------Consultas relacionadas Comentarios y Reseñas-----------------------

const getReviews = async () => {
    const query = 'SELECT * FROM comentarios as c INNER JOIN USUARIOS as u ON c.user_id = u.id';
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw new Error(error);
    }
  };

  const addPost = async (titulo,comentario,user_id) => {
    const query = 'INSERT INTO comentarios VALUES (DEFAULT, $1, $2, $3) RETURNING *';
    const values = [titulo, comentario, user_id];
    const result = await pool.query(query, values);
    return result
  };

  const addpostContacto = async (nombre_completo,correo,telefono,mensaje) => {
    const query = 'INSERT INTO contacto VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *';
    const values = [nombre_completo,correo,telefono,mensaje];
    const result = await pool.query(query, values);
    return result
  };

  
//-------------Consultas relacionadas a productos-----------------------
  
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

const createUser = async (user) => {
  try {
    const {firstName, lastName, address, email, password, image } = user
    const userData = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [email]);

    if (userData.rowCount > 0) {
      throw { code: 401, message: 'Email ya registrado' }
    }

    bcrypt.genSalt(10, (error, salt) => {
      if(error) {
        console.debug('error', error)
        return error
      }

      bcrypt.hash(password, salt, async(error, hash) => {
        if(error) {
          console.debug('error', error)
          return error
        }
        
        const query = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, 'user')"
        const values = [firstName, lastName, address, email, hash, image]
        const result = await pool.query(query, values)
        return result
      })
    })
  } catch(error) {
    throw new Error
  }

}

module.exports = {
    getUser,
    getProduct,
    addProduct,
    getReviews,
    addPost,
    addpostContacto,
    createUser
};
