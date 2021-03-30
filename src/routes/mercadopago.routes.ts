import { Router } from 'express'
//import express from 'express'
const router = Router();
//const app = express();
//const cors = require('cors'); // para que el server acepte peticiones de cualquier puerto ej 4200 de Angular

import { checkout, prueba } from '../controllers/mercadopago.controller';

// router.get('/checkout', checkout);
router.post('/checkout', checkout);
router.post('/prueba', prueba);


export default router;