import express from "express";
const router = express.Router();
import { register, profile, login, confirm, authenticate } from '../controllers/patientController.js';

router.post('/',  register);
router.get('/login',login );
router.get('/profile', profile);
router.get('/confirm/:token', confirm); //Ruta dinámica
router.post('/login',authenticate);

export default router;