import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import EmpleadoRouter from "./router/empleado.router.js";
import apiExternaRouter from "./router/api.externa.router.js";
import UsuarioRouter from "./router/usuario.router.js";
import AuthRouter from "./router/auth.router.js";
import WelcomeRouter from "./router/welcome.router.js";
import notFoundHandler from "./middleware/notFoundHandler.js";


//instancio express
const server = express();
const morgarnModule = morgan(':method :url :status :res[content-length] - :response-time ms');

// Swagger
const swaggerDocument = YAML.load(path.resolve(__dirname, "./docs/openapi.yml"));
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgarnModule); //logging de las peticiones al server


// Presentación del servidor
server.use("/", WelcomeRouter);

// Rutas de autenticación (signup/login) JWT + Supabase Auth
server.use("/api/auth", AuthRouter);

// middleware para api externa
server.use("/api/capacitaciones-externas",apiExternaRouter);

//middleware para CRUD de empleados
server.use("/api/empleado", EmpleadoRouter);

//middleware para usuarios rrhh
server.use("/api/usuario", UsuarioRouter);


// not found es para rutas que no existen
server.use(notFoundHandler);


export default server;
