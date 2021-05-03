import dotenv from "dotenv";
import { Compramp } from "./compramp";
// para variables de entorno
dotenv.config(); 

import express from "express";
//npm install --save multer (middleware para subir archivos)
var multer = require("multer");
// npm i uuid (generador de id)
const uuid = require("uuid");
const app = express();
const cors = require("cors"); // para que el server acepte peticiones de cualquier puerto ej 4200 de Angular

// importacion de las rutas
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import booksRoutes from "./routes/books.routes";
import authorsRoutes from "./routes/authors.routes";
import editorialsRoutes from "./routes/editorials.routes";
import categoriesRoutes from "./routes/categories.routes";
import adminRoutes from "./routes/admin.routes";
import ordersRoutes from "./routes/orders.routes";
import ordersDetailRoutes from "./routes/ordersDetail.routes";
import salesRoutes from "./routes/sales.routes";
import salesDetailRoutes from "./routes/salesDetail.routes";
// stripe para pagos online
import stripeRoutes from "./routes/stripe.routes";
import mercadopagoRoutes from "./routes/mercadopago.routes";
import provinciasRoutes from "./routes/provincias.routes";
// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRoutes);
app.use(userRoutes);
app.use(booksRoutes);
app.use(authorsRoutes);
app.use(editorialsRoutes);
app.use(categoriesRoutes);
app.use(adminRoutes);
app.use(stripeRoutes);
app.use(ordersRoutes);
app.use(ordersDetailRoutes);
app.use(salesRoutes);
app.use(salesDetailRoutes);
app.use(mercadopagoRoutes);
app.use(provinciasRoutes);

// para mostrar imagen en el navegador http://localhost:4000/1f2d312a-a1ef-48c5-a79f-c2a27c48320c.jpg
app.use(express.static("public"));

// Tomo el puerto del sistema operativo o el 3000
app.set("port", process.env.PORT || 3000);

// Inicio el servidor
app.listen(app.get("port"), () => {
  console.log("usuarios server on port:", app.get("port"));
});

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

