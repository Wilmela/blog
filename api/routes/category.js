import express from "express";
import { category, getAllCats } from "../controllers/cat.js";

const router = express.Router();

router.post('/', category);
router.get('/', getAllCats);


export default router;
