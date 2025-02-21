import express from "express";
import logger from "morgan";
import cors from "cors";

const app = express();

// Configurar CORS correctamente
app.use(
  cors({
    origin: "http://localhost:4200", // Permitir solo el frontend
    credentials: true, // Si usas cookies o headers de autenticación
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
  })
);

// Middleware para procesar JSON
app.use(express.json());

// Logger
app.use(logger("dev"));

// Importar y usar rutas
import indexRouter from "./routes/index.js";
app.use("/api", indexRouter);

export default app;
