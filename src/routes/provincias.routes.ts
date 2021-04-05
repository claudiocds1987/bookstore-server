import { Router } from 'express'
const router = Router();
// importacion de funciones del controlador provincias.controller
import { createProvincia, getProvincias } from '../controllers/provincias.controller'

router.post('/provincia/create', createProvincia);
router.get('/provincia/provincias', getProvincias);

export default router;