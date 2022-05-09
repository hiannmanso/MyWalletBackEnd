import { MongoClient } from 'mongodb';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();
let database = null;
const mongocliente = new MongoClient(process.env.SERVER_URL);
try {
	await mongocliente.connect();
	database = mongocliente.db('myWallet');
	console.log(chalk.bold.red('Connected to database!'));
} catch (err) {
	console.log(err);
}

export default database;
