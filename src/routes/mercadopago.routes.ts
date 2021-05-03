import { Router } from 'express'
//import express from 'express'
const router = Router();

import { checkout } from '../controllers/mercadopago.controller';

router.post('/checkout', checkout);

export default router;