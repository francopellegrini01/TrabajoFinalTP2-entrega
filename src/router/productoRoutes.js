import { Router } from "express";
import { productoController } from "../controller/productoController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", productoController.getAll);
router.get("/:id", productoController.getById);
router.post("/", productoController.create);
router.put("/:id", authMiddleware, productoController.update);
router.delete("/:id", authMiddleware, productoController.remove);

export default router;
