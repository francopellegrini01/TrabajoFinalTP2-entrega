import express from "express";
import EmpleadoRouter from "./router/empleado.router.js";
import apiExternaRouter from "./router/api.externa.router.js";

//inicializamos express
const server = express();

//servidor permite recibir e interpretar express a cualquier peticion que se le haga por JSON
server.use(express.json());

// middleware para api externa
server.use("/api/capacitaciones-externas",apiExternaRouter);

//especifico una ruta y que implemente un router
server.use("/api/empleado", EmpleadoRouter);

//catch-all for error 404
server.use((req, res, next) => {
	res.status(404).send("No está disponible este endpoint: " + req.url);
});

export default server;
