const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '898998',
    database: 'proyectofinal_grupo_4',
    allowExitOnIdle: true
})

const getUsers = async () => {
    const { rows } = await pool.query("SELECT * FROM usuarios")
    console.log(rows)
    return rows
   }

   const addUser = async (nombre,apellido,direccion,correo,img,Rol) => {
    const user = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    if (user.rowCount > 0) {
        throw { code: 401, message: 'Email ya registrado' }
    }
    const query = 'INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)';
    const values = [nombre,apellido,direccion,correo,img,Rol];
    const result = await pool.query(query, values);
    return result
}

   module.exports = {
    getUsers,
    addUser
}
