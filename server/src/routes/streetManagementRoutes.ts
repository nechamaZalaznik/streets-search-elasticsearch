import { Router } from "express";
import { streetManagementController } from "../controllers/index.js";

const router = Router();

router.delete('/:id', streetManagementController.deleteStreet);

export const streetManagementRouter = router;