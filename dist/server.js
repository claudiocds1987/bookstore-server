"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// para variables de entorno
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
//npm install --save multer (middleware para subir archivos)
var multer = require("multer");
// npm i uuid (generador de id)
const uuid = require("uuid");
const app = express_1.default();
const cors = require("cors"); // para que el server acepte peticiones de cualquier puerto ej 4200 de Angular
// importacion de las rutas
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const books_routes_1 = __importDefault(require("./routes/books.routes"));
const authors_routes_1 = __importDefault(require("./routes/authors.routes"));
const editorials_routes_1 = __importDefault(require("./routes/editorials.routes"));
const categories_routes_1 = __importDefault(require("./routes/categories.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const orders_routes_1 = __importDefault(require("./routes/orders.routes"));
const ordersDetail_routes_1 = __importDefault(require("./routes/ordersDetail.routes"));
const sales_routes_1 = __importDefault(require("./routes/sales.routes"));
const salesDetail_routes_1 = __importDefault(require("./routes/salesDetail.routes"));
// stripe para pagos online
const stripe_routes_1 = __importDefault(require("./routes/stripe.routes"));
const mercadopago_routes_1 = __importDefault(require("./routes/mercadopago.routes"));
const provincias_routes_1 = __importDefault(require("./routes/provincias.routes"));
// middlewares
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(auth_routes_1.default);
app.use(user_routes_1.default);
app.use(books_routes_1.default);
app.use(authors_routes_1.default);
app.use(editorials_routes_1.default);
app.use(categories_routes_1.default);
app.use(admin_routes_1.default);
app.use(stripe_routes_1.default);
app.use(orders_routes_1.default);
app.use(ordersDetail_routes_1.default);
app.use(sales_routes_1.default);
app.use(salesDetail_routes_1.default);
app.use(mercadopago_routes_1.default);
app.use(provincias_routes_1.default);
// para mostrar imagen en el navegador http://localhost:4000/1f2d312a-a1ef-48c5-a79f-c2a27c48320c.jpg
app.use(express_1.default.static("public"));
// Tomo el puerto del sistema operativo o el 3000
app.set("port", process.env.PORT || 3000);
// Inicio el servidor
app.listen(app.get("port"), () => {
    console.log("usuarios server on port:", app.get("port"));
});
app.get("/", (req, res) => {
    res.send("Welcome to my API");
});
