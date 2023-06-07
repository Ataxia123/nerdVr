import express from 'express';
import { request, verify } from './authController';

export const authRouter = express.Router();

authRouter.route('/request-message').post(request);
authRouter.route('/sign-message').post(verify);