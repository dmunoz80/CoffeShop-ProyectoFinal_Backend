--- Base de dato Productos
CREATE DATABASE proyectofinal_grupo_4;
\c proyectofinal_grupo_4;

CREATE TABLE IF NOT EXISTS PRODUCTOS (
    id SERIAL PRIMARY KEY, nombre VARCHAR(50), 
    descripcion VARCHAR(50), 
    precio INT, 
    imagen ???
    );


CREATE TABLE IF NOT EXISTS USUARIOS (
    id SERIAL PRIMARY KEY, 
    nombre VARCHAR(50), 
    apellido VARCHAR(50), 
    direccion VARCHAR(50), 
    correo VARCHAR(50),
    Rol VARCHAR
    );

CREATE TABLE IF NOT EXISTS COMENTARIOS (
    id SERIAL PRIMARY KEY, 
    nombre VARCHAR(50), 
    comentario VARCHAR(50)
    );

CREATE TABLE IF NOT EXISTS USUARIOS_COMENTARIOS(
    id SERIAL PRIMARY KEY,
    usuario_id INT DEFAULT NULL ,
    comentario_id INT DEFAULT NULL
);

ALTER TABLE  USUARIOS_COMENTARIOS ADD FOREIGN KEY (usuario_id) REFERENCES USUARIOS (id);
ALTER TABLE USUARIOS_COMENTARIOS ADD FOREIGN KEY (comentario_id) REFERENCES COMENTARIOS (id);



INSERT INTO inventario values
(DEFAULT, 'Collar Heart', 'collar', 'oro', 20000 , 2),
(DEFAULT, 'Collar History', 'collar', 'plata', 15000 , 5),
(DEFAULT, 'Aros Berry', 'aros', 'oro', 12000 , 10),
(DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000 , 4),
(DEFAULT, 'Anillo Wish', 'aros', 'plata', 30000 , 4),
(DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000 , 2);