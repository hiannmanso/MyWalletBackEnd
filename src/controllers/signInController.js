import { ObjectId } from 'mongodb';
import joi from 'joi';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

import database from '../db/database.js';

export async function postSingIn(req, res) {
	const { email, password } = req.body;

	const userSchema = joi.object({
		email: joi.string().email().required(),
		password: joi
			.string()
			.pattern(/[a-zA-Z0-9]/)
			.required(),
	});
	const validation = userSchema.validate(req.body);
	if (validation.error)
		res.status(400).send('erro na validação: ', validation.error);
	//ver se existe o email cadastrado
	const user = await database
		.collection('accounts')
		.findOne({ email: email });
	if (!user)
		return res
			.status(400)
			.send(
				'conta não existente, por favor verifique se digitou corretamente email e senha.'
			);
	console.log(user);
	//	console.log(token);
	if (user && bcrypt.compareSync(password, user.password)) {
		const token = v4();
		try {
			await database
				.collection('sessions')
				.insertOne({ userId: user._id, token });
			res.status(200).send(token);
		} catch (err) {
			res.status(401).send(err);
			console.log(err);
		}
	}
}

export async function getInfoUser(req, res) {
	const { authorization } = req.headers;
	const token = authorization?.replace('Bearer', '').trim();
	console.log({ authorization });
	if (!token)
		return res.status(400).send('token não encontrado'), console.log(token);
	//console.log(authorization);
	//a7e77a67-c644-4cfc-9d22-3d0b450039c8
	// const { token } = req.body;
	console.log('token', token);
	try {
		const session = await database
			.collection('sessions')
			.findOne({ token });
		// if (!session) return res.sendStatus(400);
		console.log(`session : ${session}`);
		const user = await database
			.collection('accounts')
			.findOne({ _id: new ObjectId(session.userId) });
		//if (!user) return res.sendStatus(401);
		delete user.password;
		console.log(`user :${user}`);
		res.send(user);
	} catch (err) {
		res.status(402).send(err);
		console.log(err);
	}
}
