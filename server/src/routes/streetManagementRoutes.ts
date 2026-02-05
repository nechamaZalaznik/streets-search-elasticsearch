import { Router } from "express";
import * as streetController from "../controllers/streetController.js";

const router = Router();
router.delete('/:id', streetController.deleteStreet);
export default router;