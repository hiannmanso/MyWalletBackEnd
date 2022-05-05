import { MongoClient } from 'mongodb';
import chalk from 'chalk';

let database = null;
const mongocliente = new MongoClient('mongodb://127.0.0.1:27017/');
mongocliente
	.connect()

	.then(() => {
		database = mongocliente.db('myWalley');
		console.log(chalk.bold.green('Connected to database'));
	})
	.catch((err) => {
		console.log(err);
	});

export default database;
