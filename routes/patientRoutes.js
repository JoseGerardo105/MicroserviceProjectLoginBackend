import express from "express";
const router = express.Router();
import {
  register,
  profile,
  confirm,
  authenticate,
  forgetPassword,
  checkToken,
  changePassword,
} from "../controllers/patientController.js";
import checkAuthPatient from "../middleware/authPatientMiddleware.js";

// Rutas públicas
router.post("/", register);
router.get("/confirm/:token", confirm); //Ruta dinámica
router.post("/login", authenticate);
router.patch("/forget-password", forgetPassword);
router.route("/forget-password/:token").get(checkToken).post(changePassword);

// Rutas privadas
router.get("/profile", checkAuthPatient, profile);

export default router;
