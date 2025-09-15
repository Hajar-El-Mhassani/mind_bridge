import { Router } from "express";
import { register, login, getProfile } from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/auth.js"; // Changed: middleware → middlewares

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authenticateToken, getProfile);

export default router;
