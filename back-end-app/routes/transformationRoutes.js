import express from "express";
import { getAllTransformations, createTransformation, deleteTransformation } from "../controllers/transformationController.js";

const router = express.Router();

router.get("/", getAllTransformations);
router.post("/", createTransformation);
router.delete("/:id", deleteTransformation);

export default router;