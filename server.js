require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const {getUsers, getUser, addUser, getReviews, addPost, addpostContacto,getProduct,addProduct} = require('./consultas');
const { vrfData, vrfCredencial, vrfToken } = require('./middleware');


app.listen(3000, console.log("SERVIDOR ENCENDIDO EN EL PUERTO 3000"));
module.exports = app;

app.use(express.json()) 
app.use(cors());

//-------------endpoints relacionados a usuarios-----------------------

app.get("/usuarios",vrfToken, async (req, res) => {
    try {
    const { correo } = req.data;
    const usuarios = await getUsers(correo);
    res.json(usuarios);
} catch (error) {
    res.status(500).json('error!! no fue posible conectarse a la base de datos')
    }
});

app.post('/usuarios', vrfData, async (req, res) => {
    try {
        const {nombre,apellido,direccion,correo,contrasena,img,Rol } = req.body;
        await addUser(nombre,apellido,direccion,correo,contrasena,img,Rol);
        res.status(201).send('Usuario creado exitosamente');
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).send(error);
    }
});

//-------------endpoints relacionados a Comentarios y Reseñas-----------------------

app.get('/comentarios', async (req, res) => {
    try {
    const posts = await getReviews();
    res.json(posts);
} catch (error) {
    res.status(500).json('error!! no fue posible conectarse a la base de datos')
    }
});

app.get('/contacto', async (req, res) => {
    try {
    const posts = await getReviews();
    res.json(posts);
} catch (error) {
    res.status(500).json('error!! no fue posible conectarse a la base de datos')
    }
});


app.post('/comentarios',vrfToken, async (req, res) => {
    try {
        const {title, comment,user_id} = req.body;
        await addPost(title, comment, user_id);
        res.status(200).send('Comentario Ingresado exitosamente');
    } catch (error) {
        res.status(500);
    }
  });
  

  app.post('/contacto', async (req, res) => {
    try {
        const {name,email,phone,message} = req.body;
        await addpostContacto(name,email,phone,message);
        res.status(200).send('Mensaje Ingresado exitosamente');
    } catch (error) {
        res.status(500);
    }
  });

//-------------endpoints relacionados a Productos-----------------------

app.get('/productos', async (req, res) => {
    try {
    const product = await getProduct();
    res.json(product);
} catch (error) {
    res.status(500).json('error!! no fue posible conectarse a la base de datos')
    }
});

app.post('/productos', async (req, res) => {
    try {
    const {nombre, descripcion,precio,imagen} = req.body

    if (!nombre ||!descripcion||!precio||!imagen) {
        res.status(400).json('debe ingresar todos los campos');
     }  
    const resp = await addProduct(nombre, descripcion,precio,imagen)
    res.json({nombre, descripcion,precio,imagen});
    res.send('Producto agregado')
} catch (error) {
    res.status(500);
    }
});

//-------------endpoints relacionado a Login-----------------------

app.post('/login', vrfCredencial, async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        const usuario = await getUser(correo, contrasena) 
        if (!usuario) {
            res.status(401)
            res.send({mensaje:"no autorizado"})
            return
        }
        delete usuario["contrasena"]
        const token = jwt.sign({ usuario }, process.env.JWT_SECRET);
        console.log('Token creado exitosamente')
        res.send({token:token});
        console.log(token)
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).send(error);
    }
});