import { Router } from "express";

const authController = require('../controllers/auth.controller.js');
const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);

export default authRouter;