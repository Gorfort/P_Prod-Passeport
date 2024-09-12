import express from "express";
import { get, authenticate } from "../controllers/UserController.mjs";

const router = express.Router();

router.get("/:username", get);
router.post("/login", authenticate);

export default router;
