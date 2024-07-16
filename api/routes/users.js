import express from "express";
import { getUser, updateUser, getUserId } from "../controllers/user.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.get("/findbyname/:username", getUserId);
router.put("/", updateUser);

export default router;
