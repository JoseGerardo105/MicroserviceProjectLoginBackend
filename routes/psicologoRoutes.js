import express from "express";
const router = express.Router();
import { registrar, login, perfil } from '../controllers/psicologoController.js';

router.post('/', registrar)

router.get('/login',login )

router.get('/perfil', perfil)


export default router;