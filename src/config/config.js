import dotenv from "dotenv";

dotenv.config();

export const config = {
port: process.env.PORT || 3001,

// Persistencia (mongo | json) 
dbProvider: process.env.DB_PROVIDER || "mongo",

// MongoDB Atlas 
mongoUri: process.env.MONGO_URI || "",

// Seguridad 
apiKey: process.env.API_KEY || "soy-una-api-key", 

// Protección opcional del endpoint /albums/csv
protectAlbumsCsv: process.env.PROTECT_ALBUMS_CSV === "true",
};

