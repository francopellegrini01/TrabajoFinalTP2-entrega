import { UsuarioModel } from "../model/usuario.model.js";

export const UsuarioRepository = {

  getAll: async () => {
    const usuarios = await UsuarioModel.findAll();
    return usuarios;
  },

  // Reporte: cantidad de usuarios con rol RRHH
  getCantidadUsuariosRrhh: async () => {
    return await UsuarioModel.count({
      where: { rol: "rrhh" },
    });
  },

};
