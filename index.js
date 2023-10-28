import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import patientRoutes from './routes/patientRoutes.js';
import psychologistRoutes from './routes/psychologistRoutes.js';

const app = express();
app.use(express.json());
dotenv.config(); //De esta forma va escanear y buscar el .env automáticamente
connectDB();

app.use("/api/patients", patientRoutes)
app.use("/api/psychologists", psychologistRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})