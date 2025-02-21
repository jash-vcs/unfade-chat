import { Router } from 'express';
import { createUser, updateUser } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.put('/:userId', updateUser);

export default router;
