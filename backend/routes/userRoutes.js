import express from 'express';
import {
	account,
	authenticate,
	createUser,
	getAllUsers,
	getUser
} from '../controllers/userController.js';

import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.post('/login', authenticate);

router.get('/user/:id', getUser);

router.get('/account', checkAuth, account);

export default router;
