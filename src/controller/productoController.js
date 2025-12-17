import { productoService } from "../services/productoService.js";
import { validateProducto, validateProductoUpdate } from "../validators/productoValidator.js";

export const productoController = {
  getAll: async (req, res) => {
    const productos = await productoService.getAll();
    res.json(productos);
  },

  getById: async (req, res) => {
    const producto = await productoService.getById(req.params.id);

    if (!producto) {
      return res.status(404).json({
        statusCode: 404,
        error: "Producto no encontrado"
      });
    }

    res.json(producto);
  },

  create: async (req, res) => {
    const data = req.body;

    const { valid, errors } = validateProducto(data);
    if (!valid) {
      return res.status(400).json({
        statusCode: 400,
        error: "Datos inválidos",
        details: errors
      });
    }

    const nuevo = await productoService.create(data);
    res.status(201).json(nuevo);
  },

  update: async (req, res) => {
    const data = req.body;

    const { valid, errors } = validateProductoUpdate(data);
    if (!valid) {
      return res.status(400).json({
        statusCode: 400,
        error: "Datos inválidos",
        details: errors
      });
    }

    const actualizado = await productoService.update(req.params.id, data);
    if (!actualizado) {
      return res.status(404).json({
        statusCode: 404,
        error: "Producto no encontrado"
      });
    }

    res.json(actualizado);
  },

  remove: async (req, res) => {
    const eliminado = await productoService.remove(req.params.id);

    if (!eliminado) {
      return res.status(404).json({
        statusCode: 404,
        error: "Producto no encontrado"
      });
    }

    res.json({ mensaje: "Producto eliminado" });
  },
};
