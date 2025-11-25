import { UsuarioRepository } from "../repository/usuario.repository.js";

export const UsuarioController = {

  getAllUsuarios: async (request, response) => {
    try {
      const usuarios = await UsuarioRepository.getAll();

      response.status(200).json({ usuarios });

    } catch (error) {
      console.log("Error al obtener todos los usuarios", error.message);
      response.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // Reporte: cantidad de usuarios con rol RRHH
  getCantidadUsuariosRrhh: async (req, res) => {
    try {
      const cantidad = await UsuarioRepository.getCantidadUsuariosRrhh();

      return res.status(200).json({
        ok: true,
        code: 200,
        payload: {
          rol: "rrhh",
          cantidad,
          mensaje: `Tu equipo de Recursos Humanos se encuentra conformado por ${cantidad} usuarios.`
        },
      });
    } catch (error) {
      console.log("ERROR en cantidad de usuarios RRHH:", error.message);
      return res.status(500).json({
        ok: false,
        error: "Error interno del servidor",
      });
    }
  },
};
