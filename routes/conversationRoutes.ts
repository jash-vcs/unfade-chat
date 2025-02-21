import { Router } from 'express';
import {
  createConversation,
  getConversationsByUserId,
} from '../controllers/conversationController';

const router = Router();

router.post('/', createConversation);
router.get('/:userId', getConversationsByUserId);

export default router;
