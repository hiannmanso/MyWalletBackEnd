import { MongoClient } from 'mongodb';
import joi from 'joi';
import { v4 as createToken } from 'uuid';
import bcrypt from 'bcrypt';

import database from '../database.js';

export async function postSingIn(req, res) {
	const { email, password } = req.body;
	//ver se existe o email cadastrado
	const user = await database
		.collection('accounts')
		.findOne({ email: email });
	console.log(user);
	try {
		if (user && bcrypt.compareSync(password, user.password)) {
			const token = createToken();
			await database
				.collection('sessions')
				.insertOne({ userId: user._id, token });
		}
		res.status(200).send(token);
	} catch (err) {
		res.status(400).send(err);
	}
}
export async function getInfoUser(req, res) {
	const { autorization } = req.header;
	const token = autorization?.replace('Bearer ', '').trim();
	if (!token) return res.sendStatus(402);
	try {
		const session = await database
			.collections('sessions')
			.findOne({ token });
		if (!session) return res.sendStatus(400);

		const user = await database
			.collection('accounts')
			.findOne({ userId: session.userId });
		if (!user) return res.sendStatus(401);
		res.send(user);
	} catch (err) {
		res.status(400).send(err);
	}
}
