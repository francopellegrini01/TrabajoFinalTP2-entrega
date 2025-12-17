TP2 – API de Productos + CSV de Albums
Taller de Programación II  
Alumna: Carolina Limachi

Descripción del Proyecto
La API de Productos + CSV de Albums es un servicio REST desarrollado en Node.js  que permite:

Gestionar productos almacenados en MongoDB Atlas
Consumir una API externa de álbumes musicales
Generar un archivo CSV con los primeros 15 álbumes
Devolver ese CSV al cliente

El proyecto sigue una arquitectura modular en capas, lo que facilita mantenimiento, escalabilidad y claridad:

controllers/
services/
repository/
middleware/
validators/
config/
router/
databases/
data/

Características principales
Productos
CRUD completo
Validación de datos
Persistencia en MongoDB Atlas mediante Mongoose
Manejo de errores con formato estándar
Protección de rutas sensibles mediante API Key

CSV de Albums
Consumo de API externa:
https://jsonplaceholder.typicode.com/albums
Selección de los primeros 15 álbumes
Conversión a CSV
Guardado en /data/albums_15.csv
Respuesta en formato text/csv

Tecnologías utilizadas
Node.js
Express
MongoDB Atlas
Mongoose
Morgan
dotenv

Endpoints principales
Productos – /api/v1/productos
Método	Ruta	Descripción
GET	/	Listar todos los productos
GET	/:id	Obtener producto por ID
POST	/	Crear producto
PUT	/:id	Actualizar producto (requiere API Key)
DELETE	/:id	Eliminar producto (requiere API Key)
Albums CSV – /api/v1/albums/csv
Método	Ruta	Descripción
GET	/	Genera y devuelve un CSV con los primeros 15 álbumes
Este endpoint puede protegerse mediante API Key según configuración en .env.

Seguridad
La API utiliza solo API Key

API Key
Header requerido:

x-api-key: <valor_configurado>
Se aplica a:

PUT /api/v1/productos/:id

DELETE /api/v1/productos/:id

(Opcional) GET /api/v1/albums/csv


Variables de entorno
Ejemplo de .env:

PORT=3001

DB_PROVIDER=mongo
MONGO_URI=<tu_uri_de_mongo_atlas>

API_KEY=soy-una-api-key
PROTECT_ALBUMS_CSV=false


Scripts disponibles
Script	Descripción
npm run start	Inicia el servidor
npm run dev	Modo desarrollo con watch
npm run linter:check	Ejecuta Biome
npm run linter:format	Formatea el código

Estructura del proyecto

data/
  albums_15.csv
src/
  config/
  controller/
  databases/
  middleware/
  repository/
  router/
  services/
  validators/
Test/
app.js o index.js

Estado del proyecto
Cumple todos los requisitos del TP2
Arquitectura clara y defendible
Código limpio y minimalista
Validaciones y manejo de errores correctos
CSV generado dinámicamente desde API externa