import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import signInRouter from './Routers/signInRouter.js';
import signUpRouter from './Routers/signUpRouter.js';
import transactionRouter from './Routers/transactionRouter.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(signInRouter);
app.use(signUpRouter);
app.use(transactionRouter);

app.listen(5000, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
