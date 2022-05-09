import joi from 'joi';
import bcrypt from 'bcrypt';

import database from '../database.js';

export async function postSignUp(req, res) {
	const { name, email, password } = req.body;
	const passwordHash = bcrypt.hashSync(password, 10);
	const signUpSchema = joi.object({
		name: joi
			.string()
			.min(3)
			.max(30)
			.pattern(/[a-zA-Z0-9]/)
			.required(),
		email: joi.string().email().required(),
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
	const checkUserIsValid = await database
		.collection('accounts')
		.findOne({ email });
	if (checkUserIsValid)
		return res
			.status(400)
			.send('email já está sendo usado, por favor, tente com outro.');
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
