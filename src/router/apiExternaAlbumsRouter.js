import { Router } from "express";
import { albumsController } from "../controller/albumsController.js";

const router = Router();

router.get("/", albumsController.getCsv);

export default router;
