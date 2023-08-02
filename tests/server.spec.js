const request = require("supertest");
const server = require("../server");


describe("Pruebas de rutas existentes en la API", () => {

    it("Obtener status code 200 al consultar listado de productos, que no se encuentre vacío y que cumpla con ser del tipo array", async () => {
        const res = await request(server).get("/productos").send();
        
        const status = res.statusCode;
        const producto = res.body;
        const charLength = producto.length;

        expect(status).toBe(200);
        expect(producto).toBeInstanceOf(Array);
        expect(charLength).toBeGreaterThan(0);

    })

    it("Obtener status code 200 al agregar nuevo comentario", async () => {
        const comentario = {nombre:"prueba", comentario:"comentario de prueba"};
        const res = await request(server).post("/comentarios").send(comentario);

        const status = res.statusCode;
        const comentarios = res.body
        
        expect(status).toBe(200);
        expect(comentarios).toEqual(comentario);

    })

    it("Obtener status code 400 al intentar agregar un usuario con datos incompletos", async () => {
        const user = {nombre:"nombreprueba", apellido:"apellidoprueba"};
        const res = await request(server).post("/usuarios").send(user);

        const status = res.statusCode;
        const mensaje = res.body

        expect(status).toBe(400);
        expect(mensaje).toHaveProperty('mensaje', 'Todos los datos son obligatorios');
    })

    it('Prueba status code 400, login de usuario registrado con datos incompletos', async () => {
        const user = {correo:'johndoe@correo.com',contraseña:''};
        const res = await request(server).post('/login').send(user);

        const status = res.statusCode;
        const mensaje = res.body

        expect(status).toBe(400);
        expect(mensaje).toHaveProperty('mensaje', 'correo y contraseña son obligatorios');
    });

});