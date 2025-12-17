import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  producto: { type: String, required: true, trim: true },
  stockAmount: { type: Number, required: true, min: 0 },
  fechaIngreso: {
    type: String,
    default: () => new Date().toISOString().slice(0, 10) 
  }
});

export default mongoose.model("Producto", productoSchema, "productos");
