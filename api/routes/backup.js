import express from "express";
import { getBackup, addBackup, deleteBackup } from "../controllers/backup.js";

const router = express.Router();

router.get("/", getBackup);
router.post("/", addBackup);
router.delete("/:id", deleteBackup);

export default router;
