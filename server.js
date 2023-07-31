const express = require('express');
const app = express();
const cors = require('cors');
const {getUsers, addUser, getPost, addPost,verifyUser} = require('./consultas');

app.listen(3001, console.log("SERVIDOR ENCENDIDO EN EL PUERTO 3001"));

app.use(express.json()) 
app.use(cors());


app.get("/usuarios", async (req, res) => {
    try {
    const usuarios = await getUsers();
    res.json(usuarios);
} catch (error) {
    res.status(500).json('error!! no fue posible conectarse a la base de datos')
    }
});

   app.post('/usuarios', async (req, res) => {
    try {
        const {nombre,apellido,direccion,correo,contraseña,img,Rol } = req.body;
        await addUser(nombre,apellido,direccion,correo,contraseña,img,Rol);
        res.status(201).send('Usuario creado exitosamente');
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).send(error);
    }
});

app.get('/comentarios', async (req, res) => {
    try {
    const posts = await getPost();
    res.json(posts);
} catch (error) {
    res.status(500).json('error!! no fue posible conectarse a la base de datos')
    }
});

app.post('/comentarios', async (req, res) => {
    try {
    const {nombre, comentario} = req.body

    if (!nombre ||!comentario) {
        res.status(400).json('debe ingresar todos los campos');
     }  
    const resp = await addPost(nombre, comentario)
    res.json({nombre, comentario});
    res.send('Post agregado')
} catch (error) {
    res.status(500);
    }
});