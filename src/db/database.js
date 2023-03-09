import { MongoClient } from 'mongodb';

import dotenv from 'dotenv';

dotenv.config();
let database = null;
const mongocliente = new MongoClient(process.env.SERVER_URL);
try {
	await mongocliente.connect();
	database = mongocliente.db('myWallet');
	console.log('Connected to database!');
} catch (err) {
	console.log(err);
}

export default database;
