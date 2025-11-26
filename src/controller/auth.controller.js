import SupaBaseConnection from "../databases/supabase.cnx.js";
import { UsuarioModel } from "../model/usuario.model.js";

const supabase = SupaBaseConnection.connect();

export const AuthController = {

    signup: async (request, response) => {

        const { email, password, nombre, apellido, rol } = request.body;

        console.log("BODY SIGNUP:", { email, password, nombre, apellido, rol });

        if (!email || !password || !nombre || !apellido || !rol) {
            return response.status(400).json({
                message:
                    "Los campos email, password, nombre, apellido y rol son obligatorios",
            });
        }

        if (!["admin", "rrhh"].includes(rol)) {
            return response
                .status(400)
                .json({ message: 'El rol debe ser "admin" o "rrhh"' });
        }

        try {
            const cleanEmail = email.trim(); // Elimino espacios en blanco

            // 1) Alta en Supabase Auth
            const { data, error } = await supabase.auth.signUp({
                email: cleanEmail,
                password,
                options: {
                    data: {
                        nombre,
                        apellido,
                        display_name: `${nombre} ${apellido}`,
                    }
                },
            });

            if (error) {
                console.log("SUPABASE SIGNUP ERROR:", error);

                // Si el usuario ya existe en Supabase
                if (error.code === "user_already_exists") {
                    return response.status(409).json({
                        ok: false,
                        message: "El usuario ya está registrado. Por favor, inicie sesión."
                    });
                }

                // Otros errores de Supabase
                return response.status(400).json({
                    ok: false,
                    message: error.message
                });
            }


            const authUserId = data.user.id;

            // 2) Alta en tabla usuarios (MySQL)
            const usuario = await UsuarioModel.create({
                authUserId,
                nombre,
                apellido,
                email: cleanEmail,
                rol,
            });

            const token = data.session?.access_token;

            return response.status(201).json({
                message: `El usuario ${usuario.email} se ha dado de alta en RRHH-App`,
                user: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    email: usuario.email,
                    rol: usuario.rol,
                },
                token,
            });
        } catch (err) {
            console.error("Signup error:", err);
            return response.status(500).json({ message: "Internal server error" });
        }
    },

    login: async (request, response) => {

        const { email, password } = request.body;

        if (!email || !password) {
            return response
                .status(400)
                .json({ message: "Email and password required" });
        }

        try {
            // 1) Login en Supabase
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                return response.status(401).json({ message: error.message });
            }

            const token = data.session?.access_token;

            // 2) Buscar usuario en tabla usuarios para traer rol y datos RRHH
            const usuario = await UsuarioModel.findOne({ where: { email } });

            if (!usuario) {
                return response.status(404).json({
                    message: "Usuario autenticado en Supabase pero no registrado en RRHH",
                });
            }

            return response.status(200).json({
                message: `Bienvenido ${usuario.nombre} ${usuario.apellido}`,
                user: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    email: usuario.email,
                    rol: usuario.rol,
                },
                token,
            });
        } catch (err) {
            console.error("Login error:", err);
            return response.status(500).json({ message: "Internal server error" });
        }
    },
};
