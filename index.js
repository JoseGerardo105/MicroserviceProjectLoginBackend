import express from "express";
import conectarDB from "./config/db.js";
import dotenv from 'dotenv';
import patientRoutes from './routes/patientRoutes.js';

const app = express();
app.use(express.json());
dotenv.config(); //De esta forma va escanear y buscar el .env automáticamente
conectarDB();

app.use("/api/patients", patientRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})