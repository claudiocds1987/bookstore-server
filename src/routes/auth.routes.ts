import { Router } from 'express'
import express from 'express'
const router = Router();
const app = express();
const cors = require('cors'); // para que el server acepte peticiones de cualquier puerto ej 4200 de Angular
// validations
const validations = require('./../validations/general-validations');

import { signup, signin } from '../controllers/auth.controller'

// la ruta en realidad es /api/auth/nombre fijarse en archivo server.ts en app.use('/api/auth/', authRoutes);
router.post('/api/auth/signup/user', validations.validate(validations.userSignUpValidation), signup);
router.post('/api/auth/signin/user', validations.validate(validations.userLoginValidation), signin);

export default router;