import { Router } from 'express';
import {
  sendMessage,
  getMessageHistoryByConversationId,
} from '../controllers/messageController';

const router = Router();

router.post('/', sendMessage);
router.get('/:conversationId', getMessageHistoryByConversationId);

export default router;
