import {
	validateCategory,
	validateName,
	validateGenero,
	validateSalario,
	validateDni,
} from "../validators/validators.models.js";
import { updateModel } from "../utls/updateModel.util.js";
import { EmpleadoRepository } from "../repository/empleado.repository.js";

export const EmpleadoController = {

	getAllEmpleados: async (request, response) => {
		try {
			const empleados = await EmpleadoRepository.getAll();

			response.status(200).json({ empleados });
		} catch (error) {
			console.log("Error, al obtener todos los empleados", error.message);
			response.status(500).json({ error: "error interno del server" });
		}
	},

	getById: async (request, response) => {
		const { id } = request?.params;
		try {
			const empleado = await EmpleadoRepository.getOne(id);

			if (!empleado) {
				return response.status(404).json({
					code: 404,
					ok: false,
					message: `El empleado con ID ${id} no existe`,
				});
			}

			response.status(200).json({
				code: 200,
				ok: true,
				payload: empleado,
			});
		} catch (error) {
			response.status(400).json({ error: error.message });
		}
	},

	deleteById: async (request, response) => {
		const { id } = request?.params;

		try {
			const empleado = await EmpleadoRepository.getOne(id);

			//console.log(empleado);

			if (!empleado) {
				response.status(422).json({ error: `El empleado id: ${id} no existe` });
				return;
			}

			await EmpleadoRepository.deleteOne(id);

			response.status(200).json({
				code: 200,
				ok: true,
				payload: {
					message: `El empleado: ${empleado.nombre} ${empleado.apellido} con DNI: ${empleado.dni} fue dado de baja lógica con éxito`,
				},
			});
		} catch (error) {
			response.status(400).json({ error: error.message });
		}
	},
	// Eliminación DEFINITIVA (solo admin)
	deleteHardById: async (request, response) => {
		const { id } = request.params;

		try {
			// 1. Verificar si existe el empleado
			const empleado = await EmpleadoRepository.getOne(id);

			if (!empleado) {
				return response.status(404).json({
					code: 404,
					ok: false,
					message: `El empleado con ID ${id} no existe`,
				});
			}

			// 2. Ejecutar borrado físico
			await EmpleadoRepository.destroyOne(id);

			return response.status(200).json({
				code: 200,
				ok: true,
				payload: {
					message: `El empleado ID ${empleado.id} - ${empleado.nombre} ${empleado.apellido} - con DNI ${empleado.dni} fue eliminado permanentemente de la base de datos`,
				},
			});

		} catch (error) {
			console.log("ERROR en deleteHardById:", error.message);

			return response.status(500).json({
				error: "Error interno del servidor",
			});
		}
	},


	createByJson: async (request, response) => {
		try {
			const {
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
			} = request.body;

			// 1. Validación básica de campos obligatorios
			if (!nombre || nombre.trim() === "" || !apellido || apellido.trim() === "" || !dni || !genero || !area || !puesto) {
				return response.status(422).json({
					message: "Faltan datos obligatorios: nombre, apellido, dni, genero, area o puesto",
				});
			}

			// 2. Validación de DNI formato (8 números)
			const { valid: validDni, message: msgDni } = validateDni(dni);
			if (!validDni) {
				return response.status(422).json({
					message: msgDni,
				});
			}

			// 3. Valida si el DNI ya existe en la DB
			const dniExiste = await EmpleadoRepository.validarDniExistente(dni);

			if (dniExiste) {
				return response.status(409).json({
					message: `Error: el DNI ${dni} ya existe en la base de datos.`,
				});
			}

			// 4. Validación de género (F/M)
			const { valid: validGenero, message: msgGenero } = validateGenero(genero);

			if (!validGenero) {
				return response.status(422).json({
					message: msgGenero,
				});
			}
			//*normalizamos el genero para guardar siempre en mayuscula
			const generoNormalizado = genero.trim().toUpperCase();

			// 5. Validación de salario
			const { valid: validSalario, message: msgSalario } = validateSalario(salarioBase);

			if (!validSalario) {
				return response.status(422).json({
					message: msgSalario,
				});
			}

			const empleado = await EmpleadoRepository.createOne({
				nombre,
				apellido,
				dni,
				telefono,
				email,
				fechaNacimiento,
				fechaIngreso,
				salarioBase,
				genero: generoNormalizado,
				area,
				puesto,
			});

			console.log("Empleado creado: ", empleado);

			return response.status(200).json({
				code: 200,
				ok: true,
				payload: {
					message: `Empleado ${empleado.nombre} ${empleado.apellido} dado de alta con éxito`,
					id: empleado.id,
				},
			});
		} catch (error) {
			console.log("ERROR COMPLETO EN CREATE:", error);
			response.status(500).json({
				error: "Error interno del servidor",
			});
		}
	},


	// // hacer un endpoint que haga una busqueda por el nombre y actualice

	updateByJson: async (request, response) => {
		const empleadoInput = request.body;

		try {
			if (!empleadoInput.id) {
				return response.status(400).json({
					error: "Debe enviar el ID del empleado a actualizar",
				});
			}

			const empleadoFromDataBase = await EmpleadoRepository.getOne(
				empleadoInput.id,
			);

			console.log("El empleado a actualizar es: ", empleadoFromDataBase);

			if (!empleadoFromDataBase) {
				response.status(422).json({
					error: `El empleado con ID ${empleadoInput.id} no existe`,
				});
				return;
			}

			//1. Validacion nombre
			if (empleadoInput.nombre !== undefined) {
				const { valid: validName } = validateName(empleadoInput.nombre);
				if (!validName) {
					return response.status(422).json({
						message: "El nombre no es válido",
					});
				}
			}
			// 2. Validación apellido
			if (empleadoInput.apellido !== undefined) {
				const { valid: validApellido } = validateName(empleadoInput.apellido);
				if (!validApellido) {
					return response.status(422).json({
						message: "El apellido no es válido",
					});
				}
			}

			// 3. Validación salario
			if (empleadoInput.salarioBase !== undefined) {
				const { valid: validSalario, message: msgSalario } =
					validateSalario(empleadoInput.salarioBase);

				if (!validSalario) {
					return response.status(422).json({
						message: msgSalario,
					});
				}
			}

			// Base model con los datos actuales de la DB
			const baseModel = {
				id: empleadoFromDataBase.id,
				nombre: empleadoFromDataBase.nombre,
				apellido: empleadoFromDataBase.apellido,
				email: empleadoFromDataBase.email,
				telefono: empleadoFromDataBase.telefono,
				salarioBase: empleadoFromDataBase.salarioBase,
			};

			// Mezclamos datos actuales + datos nuevos (sin pisar con null / "")
			const updatedData = updateModel(baseModel, empleadoInput);

			console.log({ updatedData });

			await EmpleadoRepository.updateOne(updatedData);

			response.status(200).json({
				code: 200,
				ok: true,
				payload: {
					message: `El empleado ${updatedData.nombre} ${updatedData.apellido} fue actualizado exitosamente`,
				},
			});
		} catch (error) {
			console.log("Error en updateByJson:", error.message);
			response.status(400).json({ error: error.message });
		}
	},

	// Estadistica: sueldo promedio por area
	getPromedioSueldosPorArea: async (req, res) => {
		try {
			const resultado = await EmpleadoRepository.getPromedioSueldosPorArea();

			return res.status(200).json({
				ok: true,
				code: 200,
				payload: resultado
			});

		} catch (error) {
			console.log("ERROR en estadistica sueldo promedio por area:", error.message);
			return res.status(500).json({
				ok: false,
				error: "Error interno del servidor"
			});
		}
	},

	// Reporte: cantidad de empleados por area (solo empleados activos)
	getCantidadEmpleadosPorArea: async (req, res) => {
		try {
			const resultado = await EmpleadoRepository.getCantidadEmpleadosPorArea();

			return res.status(200).json({
				ok: true,
				code: 200,
				message: "Cantidad de empleados activos por area",
				payload: resultado
			});

		} catch (error) {
			console.log("ERROR en cantidad de empleados por área:", error.message);
			return res.status(500).json({
				ok: false,
				error: "Error interno del servidor"
			});
		}
	},


};