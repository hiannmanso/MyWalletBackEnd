import joi from 'joi';

import database from '../database.js';
import { ObjectId } from 'mongodb';

export async function postTransaction(req, res) {
	const { value, description, type } = req.body;
	const validateItens = { value, description };
	const { id } = req.params;

	const today = new Date();
	const time = today.toLocaleDateString('pt-BR', {
		day: '2-digit',
		month: '2-digit',
	});
	const transationSchema = joi.object({
		value: joi.string().required().pattern(/[0-9]/),
		description: joi.string().required().max(100),
	});
	const validation = transationSchema.validate(validateItens);
	if (validation.error) {
		console.log(validation.error);
		return;
	}
	try {
		const transaction = await database
			.collection('transaction')
			.insertOne({ id, value, description, date: time, type });

		console.log(transaction);
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
}
export async function getTransaction(req, res) {
	const { id } = req.params;
	try {
		const userTransactions = await database
			.collection('transaction')
			.find({ id })
			.toArray();
		console.log(userTransactions);

		//deletando o _id enquanto nao consigo fazer o id == _id
		delete userTransactions._id;

		res.status(200).send(userTransactions);
	} catch (err) {
		console.log(err);
		res.status(400).send('error ', err);
	}
}

export async function deleteTransaction(req, res) {
	const { id } = req.params;
	try {
		const transactionDelected = await database
			.collection('transaction')
			.findOneAndDelete({ _id: new ObjectId(id) });
		res.status(200).send(transactionDelected);
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
}

export async function updateTransaction(req, res) {
	const { id } = req.params;
	const { value, description } = req.body;
	const transationSchema = joi.object({
		value: joi.string().required().pattern(/[0-9]/),
		description: joi.string().required().max(100),
	});
	const validation = transationSchema.validate(req.body);
	if (validation.error) {
		console.log(validation.error);
		return;
	}
	try {
		await database
			.collection('transaction')
			.findOneAndUpdate(
				{ _id: new ObjectId(id) },
				{ $set: value, description }
			);
		res.status(200).send('sucess');
	} catch (err) {
		res.status(400).send(err);
	}
}
