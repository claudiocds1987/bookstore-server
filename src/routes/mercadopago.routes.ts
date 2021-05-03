import { Router } from 'express'
//import express from 'express'
const router = Router();

import { checkout } from '../controllers/mercadopago.controller';

// router.get('/checkout', checkout);
router.post('/checkout', checkout);
// router.post('/prueba', prueba);


export default router;