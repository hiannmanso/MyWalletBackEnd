import express from 'express';
import {
	deleteTransaction,
	getTransaction,
	postTransaction,
	updateTransaction,
} from '../controllers/transactionController.js';

const transactionRouter = express.Router();
transactionRouter.post('/transaction/:id', postTransaction);
transactionRouter.get('/transaction/:id', getTransaction);
transactionRouter.delete('/transaction/:id', deleteTransaction);
transactionRouter.put('/transaction/:id', updateTransaction);

export default transactionRouter;
