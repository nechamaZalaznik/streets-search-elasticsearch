import { Router } from "express";
import * as searchController from "../controllers/searchController.js";

const router = Router();
router.get('/free', searchController.freeSearch);
router.get('/words', searchController.fullWordsSearch);
router.get('/phrase', searchController.phraseSearch);
export default router;