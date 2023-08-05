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
(DEFAULT,'John','Doe','Av. Providencia','johndoe@correo.com','johndoe','https://randomuser.me/api/portraits/men/51.jpg','admin'),
(DEFAULT,'Jane','Smith','Av. Pedro Montt','janesmith@correo.com','janesmith','https://randomuser.me/api/portraits/women/17.jpg','admin'),
(DEFAULT,'Robin','Freeman','3685 Crockett St','robin.freeman@correo.com','robinfreeman','https://randomuser.me/api/portraits/women/19.jpg','user'),
(DEFAULT,'Jennie','James','1306 Blossom Hill Rd','jennie.james@correo.com','jenniejames','https://randomuser.me/api/portraits/women/56.jpg','user'),
(DEFAULT,'Ann','Gonzalez','4856 Wheeler Ridge Dr','ann.gonzalez@correo.com','anngonzalez','https://randomuser.me/api/portraits/women/0.jpg','user'),
(DEFAULT,'Marjorie','Fox','7885 Edwards Rd','marjorie.fox@correo.com','marjoriefox','https://randomuser.me/api/portraits/women/13.jpg','user'),
(DEFAULT,'Justin','Reed','5793 Marsh Ln','justin.reed@correo.com','justinreed','https://randomuser.me/api/portraits/men/58.jpg','user'),
(DEFAULT,'Gene','Sanders','5129 Stevens Creek Blvd','gene.sanders@correo.com','genesanders','https://randomuser.me/api/portraits/men/75.jpg','user'),
(DEFAULT,'Anthony','Graham','7752 Country Club Rd','anthony.graham@correo.com','anthonygraham','https://randomuser.me/api/portraits/men/73.jpg','user'),
(DEFAULT,'Nathan','Harvey','5630 Washington Ave','nathan.harvey@correo.com','nathanharvey','https://randomuser.me/api/portraits/men/93.jpg','user');

-------------Tabla Comentarios---------------
CREATE TABLE IF NOT EXISTS COMENTARIOS (
    id SERIAL PRIMARY KEY, 
    titulo VARCHAR(50),
    comentario VARCHAR(200),
    user_id INTEGER
    );

---------Datos Tabla comentarios-----------------
INSERT INTO COMENTARIOS values
(DEFAULT, 'Café en Grano Premium', '¡El café en grano es exquisito! Su aroma y sabor son incomparables. Sin duda, el mejor café que he probado. El despacho fue rápido y el empaque muy bien protegido.',3),
(DEFAULT, 'Café Especial en Grano', 'Este café en grano es simplemente espectacular. Cada taza es un placer para los sentidos. El servicio de despacho fue eficiente y el paquete llegó en perfectas condiciones.',4),
(DEFAULT, 'Café en Grano Orgánico', 'El café en grano orgánico es delicioso. Tiene un sabor suave y auténtico. Estoy muy satisfecho con la compra y el despacho fue rápido y sin problemas.',5),
(DEFAULT, 'Café en Grano de Origen', 'Me encanta el café en grano de origen. Cada variedad tiene sus notas distintivas y son todas maravillosas. La entrega fue puntual y el café llegó fresco.',6),
(DEFAULT, 'Café en Grano para Espresso', 'Este café en grano es ideal para preparar espressos. La crema que produce es perfecta. El servicio de despacho fue rápido y confiable. Seguiré comprando aquí.',7),
(DEFAULT, 'Café en Grano Premium', '¡El café en grano es exquisito! Su aroma y sabor son incomparables. Sin duda, el mejor café que he probado. El despacho fue rápido y el empaque muy bien protegido.',1),
(DEFAULT, 'Café Especial en Grano', 'Este café en grano es simplemente espectacular. Cada taza es un placer para los sentidos. El servicio de despacho fue eficiente y el paquete llegó en perfectas condiciones.',2),
(DEFAULT, 'Café en Grano Orgánico', 'El café en grano orgánico es delicioso. Tiene un sabor suave y auténtico. Estoy muy satisfecho con la compra y el despacho fue rápido y sin problemas.',8),
(DEFAULT, 'Café en Grano de Origen', 'Me encanta el café en grano de origen. Cada variedad tiene sus notas distintivas y son todas maravillosas. La entrega fue puntual y el café llegó fresco.',9),
(DEFAULT, 'Café en Grano para Espresso', 'Este café en grano es ideal para preparar espressos. La crema que produce es perfecta. El servicio de despacho fue rápido y confiable. Seguiré comprando aquí.',10);

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