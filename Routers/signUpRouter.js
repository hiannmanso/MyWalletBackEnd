import express from 'express';
import { postSignUp } from '../controllers/signUpController.js';

const signUpRouter = express.Router();
signUpRouter.post('/sign-up', postSignUp);

export default signUpRouter;
