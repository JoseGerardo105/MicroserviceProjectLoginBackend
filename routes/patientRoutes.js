import express from "express";
const router = express.Router();
import { register, profile, login, confirm } from '../controllers/patientController.js';

router.post('/',  register);

router.get('/login',login );

router.get('/profile', profile);

router.get('/confirm/:token', confirm); //Ruta dinámica

export default router;