import express from "express";
import { UsuarioController } from "../controller/usuario.controller.js";
import { authorizeAdmin } from "../middleware/authorizeAdmin.js";
import { authenticateToken } from "../middleware/authentication.js";

const UsuarioRouter = express.Router();

UsuarioRouter.get("/all", authenticateToken, authorizeAdmin, UsuarioController.getAllUsuarios)

// Reporte: cantidad de usuarios con rol RRHH
UsuarioRouter.get("/estadisticas/cantidad-rrhh", authenticateToken, authorizeAdmin, UsuarioController.getCantidadUsuariosRrhh);

export default UsuarioRouter;