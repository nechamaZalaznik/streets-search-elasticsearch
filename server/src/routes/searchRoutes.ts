import { Router } from "express";
import { searchController } from "../controllers/index.js";

const router = Router();

router.get('/free', searchController.freeSearch);
router.get('/words', searchController.fullWordsSearch);
router.get('/phrase', searchController.phraseSearch);

export const streetRouter = router;