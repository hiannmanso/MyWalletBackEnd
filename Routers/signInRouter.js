import express from 'express';

import { postSingIn, getInfoUser } from '../controllers/signInController.js';

const signInRouter = express.Router();
signInRouter.post('/sign-in', postSingIn);
signInRouter.get('/sign-in', getInfoUser);

export default signInRouter;
