import { config } from "../config/config.js";
import { productoRepositoryMongo } from "../repository/productoRepositoryMongo.js";

const repo = productoRepositoryMongo;

export const productoService = {
  getAll: () => repo.getAll(),
  getById: (id) => repo.getById(id),
  create: (data) => repo.create(data),
  update: (id, data) => repo.update(id, data),
  remove: (id) => repo.remove(id),
};
