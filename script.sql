--- Base de datos
CREATE DATABASE proyectofinal_grupo_4;
\c proyectofinal_grupo_4;

--------Tabla Productos---------------
CREATE TABLE IF NOT EXISTS PRODUCTOS (
    id SERIAL PRIMARY KEY, 
    nombre VARCHAR, 
    descripcion VARCHAR, 
    precio INT, 
    imagen VARCHAR);

---------Datos Tabla Productos-------------
INSERT INTO PRODUCTOS values
(DEFAULT,'Negro','El cafe negro es muy simple, se obtiene con granos de cafe molidos remojados en agua caliente, servidos tibios.',1000,'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/640px-A_small_cup_of_coffee.JPG'),
(DEFAULT,'Latte','La bebida de cafe mas popular que existe, el cafe con leche se compone de un shot de espresso y leche al vapor con solo un toque de espuma. Se puede pedir solo o con un toque de sabor vainilla',1000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Latte_at_Doppio_Ristretto_Chiang_Mai_01.jpg/509px-Latte_at_Doppio_Ristretto_Chiang_Mai_01.jpg'),
(DEFAULT,'Cappuccino','El capuchino es un cafe con leche hecho con más espuma que la leche al vapor, a menudo con una pizca de cacao en polvo o canela encima. A veces, puede encontrar variaciones que usan crema en lugar de leche o que también agregan un sabor',1000,'https://upload.wikimedia.org/wikipedia/commons/e/ed/Wet_Cappuccino_with_heart_latte_art.jpg'),
(DEFAULT,'Americano','Con un sabor similar al del cafe negro, el americano consiste en un shot de espresso diluido en agua caliente',1000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Hokitika_Cheese_and_Deli%2C_Hokitika_%283526706594%29.jpg/1280px-Hokitika_Cheese_and_Deli%2C_Hokitika_%283526706594%29.jpg');

--------Tabla Usuarios---------------
CREATE TABLE IF NOT EXISTS USUARIOS (
    id SERIAL PRIMARY KEY, 
    nombre VARCHAR(50), 
    apellido VARCHAR(50), 
    direccion VARCHAR(50), 
    correo VARCHAR(50),
    contrasena VARCHAR(50),
    img VARCHAR,
    Rol VARCHAR);

-----------------Datos Tabla Ususarios-------------------
INSERT INTO USUARIOS values
(DEFAULT,'John','Doe','Av. Providencia','johndoe@correo.com','password123','https://randomuser.me/api/portraits/men/51.jpg','user'),
(DEFAULT,'Jane','Smith','Av. Pedro Montt','janesmith@correo.com','password456','https://randomuser.me/api/portraits/women/17.jpg','admin');

-------------Tabla Comentarios---------------
CREATE TABLE IF NOT EXISTS COMENTARIOS (
    id SERIAL PRIMARY KEY, 
    nombre VARCHAR(50),
    comentario VARCHAR(50)
    );

---------Datos Tabla comentarios-----------------
INSERT INTO COMENTARIOS values
(DEFAULT, 'John Doe', 'excelente atención'),
(DEFAULT, 'Jane Smith', 'un muy buen lugar para los fanáticos del cafe');

-------------------Tabla usuarios_comentarios-------------------------------
CREATE TABLE IF NOT EXISTS USUARIOS_COMENTARIOS(
    id SERIAL PRIMARY KEY,
    usuario_id INT DEFAULT NULL ,
    comentario_id INT DEFAULT NULL
);

ALTER TABLE  USUARIOS_COMENTARIOS ADD FOREIGN KEY (usuario_id) REFERENCES USUARIOS (id);
ALTER TABLE USUARIOS_COMENTARIOS ADD FOREIGN KEY (comentario_id) REFERENCES COMENTARIOS (id);

---------------Datos Tabla usuarios_comentarios-----------
INSERT INTO USUARIOS_COMENTARIOS values
(DEFAULT, 1,1),
(DEFAULT, 2,2);