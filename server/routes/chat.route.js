import express from 'express';
import { getMessages } from '../controllers/chats.controller.js';
import { getlabelforchat } from '../controllers/chats.controller.js';

const router_chat = express.Router();

router_chat.get('/:roomId', getMessages);
router_chat.get('/chatlabel/:sellerId/:chattingto', getlabelforchat);

export default router_chat;