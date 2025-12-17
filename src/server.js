import express from "express";
import morgan from "morgan";
import path from "path";

import { fileURLToPath } from "url";

import WelcomeRouter from "./router/welcomeRouter.js";
import productoRoutes from "./router/productoRoutes.js";
import albumsCsvRouter from "./router/apiExternaAlbumsRouter.js";
import notFoundHandler from "./middleware/notFoundHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan(":method :url :status :res[content-length] - :response-time ms"));


// Rutas
server.use("/", WelcomeRouter);
server.use("/api/v1/productos", productoRoutes);
server.use("/api/v1/albums/csv", albumsCsvRouter);

// 404
server.use(notFoundHandler);

export default server;
