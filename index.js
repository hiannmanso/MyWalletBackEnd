import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';

import signInRouter from './Routers/SignInRouter.js';
import signUpRouter from './Routers/SignUpRouter.js';
import transactionRouter from './Routers/transactionRouter.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(signInRouter);
app.use(signUpRouter);
app.use(transactionRouter);

app.listen(5000, () => {
	console.log(chalk.bold.green('Server is running on port 5000'));
});
