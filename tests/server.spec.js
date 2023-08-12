const request = require("supertest");
const server = require("../server");

const tokenEjemplo = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Im5vbWJyZSI6IkpvaG4iLCJhcGVsbGlkbyI6IkRvZSIsImRpcmVjY2lvbiI6IkF2LiBQcm92aWRlbmNpYSIsImNvcnJlbyI6ImpvaG5kb2VAY29ycmVvLmNvbSIsImNvbnRyYXNlbmEiOiJwYXNzd29yZDEyMyIsImltZyI6Imh0dHBzOi8vcmFuZG9tdXNlci5tZS9hcGkvcG9ydHJhaXRzL21lbi81MS5qcGciLCJyb2wiOiJ1c2VyIn0sImlhdCI6MTY5MTAxNDY1OX0.pIsKH-vS1AIb85NTKLUxzEv-xwEeemE5YMKb-adwLcg"

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

    it("Obtener status code 200 al agregar nuevo comentario con token válido", async () => {
        const mensaje = {titulo:"nombreprueba", comentario:"apellidoprueba"};
        const token = tokenEjemplo
        const res = await request(server).post("/comentarios").set('Authorization', `Bearer ${token}`).send(mensaje);

        const status = res.statusCode;
        
        expect(status).toBe(200);

    })

    it("Obtener status code 404 al intentar agregar un usuario con datos incompletos", async () => {
        const user = {nombre:"nombreprueba", apellido:"apellidoprueba"};
        const res = await request(server).post("/usuarios").send(user);

        const status = res.statusCode;

        expect(status).toBe(404);

    })

    it('Prueba status code 400, login de usuario registrado con datos incompletos', async () => {
        const user = {correo:'johndoe@correo.com', contrasena:''};
        const res = await request(server).post('/login').send(user);

        const status = res.statusCode;
        const mensaje = res.body

        expect(status).toBe(400);
        expect(mensaje).toHaveProperty('mensaje', 'correo y contraseña son obligatorios');
    });

});