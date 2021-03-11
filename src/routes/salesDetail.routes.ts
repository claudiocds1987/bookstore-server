import { Router } from 'express'
const router = Router();

import { createSaleDetail, getSaleDetail } from '../controllers/salesDetail.controller'

router.post('/salesDetail/create', createSaleDetail);
router.get('/salesDetail/:id_sale', getSaleDetail);

export default router;