import express from "express";
const router = express.Router();
import {
  register,
  profile,
  login,
  confirm,
  authenticate,
} from "../controllers/patientController.js";
import checkAuth from "../middleware/authMiddleware.js";

router.post("/", register);
router.get("/login", login);
router.get("/confirm/:token", confirm); //Ruta dinámica
router.post("/login", authenticate);

router.get("/profile", checkAuth, profile);

export default router;
