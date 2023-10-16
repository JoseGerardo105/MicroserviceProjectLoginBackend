import express from "express";
import conectarDB from "./config/db.js";
import dotenv from 'dotenv';
import psicologoRoutes from './routes/psicologoRoutes.js';

const app = express();
dotenv.config(); //De esta forma va escanear y buscar el .env automáticamente
conectarDB();

app.use("/api/psicologos", psicologoRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto 4000");
})