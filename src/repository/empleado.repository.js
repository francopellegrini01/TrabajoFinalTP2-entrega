import { EmpleadoModel } from "../model/empleado.model.js";
import { sequelize } from "../databases/mysql.cnx.js";

export const EmpleadoRepository = {

	getAll: async () => {
		return await EmpleadoModel.findAll();
	},

	getOne: async (id) => {
		const empleado = await EmpleadoModel.findOne({ where: { id } });
		return empleado ? empleado.dataValues : null;
	},

	// Baja lógica del empleado
	deleteOne: async (id) => {
		return await EmpleadoModel.update(
			{
				empleado_activo: false,
			},
			{ where: { id } }
		);
	},

	// Eliminación definitiva (solo admin)
	destroyOne: async (id) => {
		return await EmpleadoModel.destroy({
			where: { id },
		});
	},

	// Actualizar datos principales del empleado
	updateOne: async ({ id, nombre, apellido, email, telefono, salarioBase }) => {
		return await EmpleadoModel.update(
			{
				nombre,
				apellido,
				email,
				telefono,
				salarioBase
			},
			{ where: { id } }
		);
	},

	/* updateOne: async ({ nombre, apellido, id, email }) => {
		return await EmpleadoModel.update(
			{
				nombre,
				apellido,
				email,
			},
			{ where: { id } },
		);
	}, */

	// Validación de DNI único
	validarDniExistente: async (dni) => {
		const empleado = await EmpleadoModel.findOne({ where: { dni } });
		return empleado !== null;
	},

	// Crear un nuevo empleado
	createOne: async ({
		nombre,
		apellido,
		dni,
		telefono,
		email,
		fechaNacimiento,
		fechaIngreso,
		salarioBase,
		genero,
		area,
		puesto,
	}) => {
		return await EmpleadoModel.create({
			nombre,
			apellido,
			dni,
			telefono,
			email,
			fechaNacimiento,
			fechaIngreso,
			salarioBase,
			genero,
			area,
			puesto,
			empleado_activo: true, // aseguramos que sea activo
		});
	},

	// Estadistica: sueldo promedio por area (redondeado)
	getPromedioSueldosPorArea: async () => {
		return await EmpleadoModel.findAll({
			attributes: [
				"area", 
				[
					sequelize.fn(
						"ROUND",
						sequelize.fn("AVG", sequelize.col("salarioBase")) // promedio de salario
					),
					"promedio_sueldo"
				]
			],
			where: {
				empleado_activo: true, // solo empleados activos
			},
			group: ["area"],
		});
	},

	// Reporte: cantidad de empleados por area (solo empleados activos)
	getCantidadEmpleadosPorArea: async () => {
		return await EmpleadoModel.findAll({
			attributes: [
				"area",
				[sequelize.fn("COUNT", sequelize.col("id")), "cantidad_empleados"] // contar empleados
			],
			where: {
				empleado_activo: true // solo empleados activos
			},
			group: ["area"] // agrupar por area
		});
	},



};
