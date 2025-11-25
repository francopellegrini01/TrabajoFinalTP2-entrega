import express from "express";
import { EmpleadoController } from "../controller/empleado.controller.js";

import { authenticateToken } from "../middleware/authentication.js";
import { authorizeAdmin } from "../middleware/authorizeAdmin.js";

const EmpleadoRouter = express.Router();

//crud

EmpleadoRouter

	//Rutas protegidas para empleados rrhh (requiere estar logueado)
	.get("/select/:id", authenticateToken, EmpleadoController.getById)
	.delete("/delete/:id", authenticateToken, EmpleadoController.deleteById)
	.post("/create", authenticateToken, EmpleadoController.createByJson)
	.patch("/update", authenticateToken, EmpleadoController.updateByJson)

	//SOLO ADMIN ( requiere estar logueado y rol admin ) get all y delete definitivo
	.get("/all", authenticateToken, authorizeAdmin, EmpleadoController.getAllEmpleados)
	.delete("/delete-hard/:id", authenticateToken, authorizeAdmin, EmpleadoController.deleteHardById)

	// SOLO ADMIN -  Estadisticas: sueldo promedio por area 
	.get("/estadisticas/promedio-sueldo-area", authenticateToken, authorizeAdmin, EmpleadoController.getPromedioSueldosPorArea)

	// SOLO ADMIN - Reporte: cantidad empleados por area 
	.get("/estadisticas/cantidad-area",	authenticateToken, authorizeAdmin, EmpleadoController.getCantidadEmpleadosPorArea);




export default EmpleadoRouter;
