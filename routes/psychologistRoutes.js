import express from "express";
const router = express.Router();
import {
  register,
  profile,
  authenticate,
} from "../controllers/psychologistController.js";
import checkAuthPsychologist from "../middleware/authPsychologistMiddleware.js";

// Rutas públicas
router.post("/", register);
router.post("/login", authenticate);

// Rutas privadas
 router.get("/profile", checkAuthPsychologist, profile);

export default router;
