# RRHH – Gestión de Empleados  
*API REST* para administración interna de empleados, desarrollada como **Trabajo Final de Taller de Programación II (ORT Argentina).**

---

## Descripción del Proyecto

**RRHH – Gestión de Empleados** es una API REST que permite administrar empleados, usuarios internos y estadísticas del área de Recursos Humanos.  
El sistema utiliza **Supabase + JWT** para autenticación segura, **MySQL + Sequelize** para base de datos y una arquitectura limpia en capas (controllers, repository, routers, modelos, middleware).

Incluye:

- ABM completo de empleados  
- Eliminación lógica y eliminación definitiva (solo admin)  
- Sistema de roles: **admin** y **rrhh**  
- Gestión interna de usuarios  
- Consumo de una API externa  
- Reportes y estadísticas  
- Endpoints de estado del servidor (welcome + healthcheck)  

**Repositorio GitHub:**  
🔗 https://github.com/francopellegrini01/TrabajoFinalTP2-entrega  

**Tecnologías principales:**  
- Node.js  
- Express  
- Supabase Auth (JWT)  
- MySQL + Sequelize  
- Morgan  
- dotenv  

**Scripts disponibles:**  
- `npm run dev` → Inicia el servidor en modo desarrollo  
- `npm run linter:check` → Ejecuta Biome para análisis de código  
- `npm run linter:format` → Formatea el código automáticamente  


**Integrandes del grupo:**  
- M. Daniela, Rios Valencia
- Franco, Pellegrini
- Carolina, Limachi
