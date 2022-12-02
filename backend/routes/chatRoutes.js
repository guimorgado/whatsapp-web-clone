import express from 'express';
import {
	createChat,
	findChat,
	userChat
} from '../controllers/chatController.js';

const router = express.Router();

router.post('/', createChat);
router.get('/:userId', userChat);
router.get('/find/:firstId/:seconfId', findChat);

export default router;
