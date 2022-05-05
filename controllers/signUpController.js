import joi from 'joi';
import { v4 as createToken } from 'uuid';
import bcrypt from 'bcrypt';

import database from '../database.js';

export async function postSignUp(req, res) {
	const { name, email, password } = req.body;
	const passwordHash = bcrypt.hashSync(password, 10);
	const signUpSchema = joi.object({
		name: joi.string().min(3).max(30).required(),
		email: joi.string().pattern(/com/).required(),
		password: joi
			.string()
			.pattern(/[a-zA-Z0-9]/)
			.min(5)
			.max(20)
			.required(),
	});
	const validation = signUpSchema.validate(req.body);
	if (validation.error) {
		console.log(validation);
		res.status(400).send(validation.error);
		return;
	}
	try {
		const user = await database.collection('accounts').insertOne({
			name,
			email,
			password: passwordHash,
		});
		res.status(200).send(user);
	} catch (err) {
		res.status(200).send(err);
	}
}
