require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const {getUser,getUsers,updateRolUser,getReviews, addPost, addpostContacto,getProduct,addProduct,createUser} = require('./src/Consultas/consultas');
const { vrfData, vrfCredencial, vrfToken } = require('./src/middlewares/middleware');
const bcrypt = require('bcryptjs');


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

module.exports = app;
app.use(express.json()) 
app.use(cors());

//-------------endpoints relacionados a Comentarios y Reseñas-----------------------

app.get('/comentarios', async (req, res) => {
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

app.get('/usuarios', async (req, res) => {
    try {
    const posts = await getUsers();
    res.json(posts);
} catch (error) {
    res.status(500).json('error!! no fue posible conectarse a la base de datos')
    }
});


app.post('/login', vrfCredencial, async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        const usuario = await getUser(correo) 
        if (!usuario) {
            res.status(401)
            res.send({mensaje:"no autorizado"})
            return
        }
        bcrypt.compare(contrasena, usuario.contrasena, (error, result) => {
            if(error || !result) {
                console.log(error);
                res.status(500).send(error);
                return
            }

            delete usuario["contrasena"]
            const token = jwt.sign({ usuario }, process.env.JWT_SECRET);
            console.log('Token creado exitosamente')
            res.send({token:token});
            console.log(token)
        })

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).send(error);
    }
});

app.post('/sign_in',vrfData,async (req, res) => {
    try {
        const userData = req.body
        await createUser(userData)
        res.send(201, {message:"usuario creado"})
    }
    catch(error) {
        res.send(500, {message:"No se ha creado el usuario"})
    }
})

app.put("/usuarios/:id", async (req, res) => {
    try {
      const {id} = req.params
      const {rol}= req.body
      console.log(req.body)
      const ok = await updateRolUser(id,rol);
      res.send(ok);
      console.log(req.params);
    } catch (error) {
      console.error(error);
    }

  });