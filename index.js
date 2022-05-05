import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import joi from 'joi';
import { v4 as createToken } from 'uuid';
import dotenv from 'dotenv';

import database from './database.js';
import { postSignUp } from './controllers/signUpController.js';
import { getInfoUser, postSingIn } from './controllers/signInController.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', postSignUp);

app.get('/sing-up', async (req, res) => {
	try {
		const listUser = await database.collection('accounts').find({});
		res.status(200).send(listUser);
	} catch (err) {
		res.status(400).send(err);
	}
});

app.post('/sign-in', postSingIn);

app.get('/sign-in', getInfoUser);

app.listen(5000, () => {
	console.log(chalk.bold.green('Server is running on port 5000'));
});
