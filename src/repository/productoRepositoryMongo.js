import Producto from "../model/productoModel.js";

console.log("✅ Usando colección:", Producto.collection.name);

export const productoRepositoryMongo = {
  getAll: async () => {
    return await Producto.find();
  },

  getById: async (id) => {
    return await Producto.findById(id);
  },

  create: async (data) => {
    const nuevo = new Producto(data);
    return await nuevo.save();
  },

  update: async (id, data) => {
    return await Producto.findByIdAndUpdate(id, data, { new: true });
  },

  remove: async (id) => {
    return await Producto.findByIdAndDelete(id);
  },
};
