import mongoose from "mongoose";
import { config } from "../config/config.js";

export const connectMongo = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000, 
    });

    console.log("Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);

   
    console.error("Revisar la variable MONGO_URI en el archivo .env");

    process.exit(1); 
  }
 

};
