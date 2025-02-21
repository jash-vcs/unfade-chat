import { Router } from 'express';
import { createUser, updateUser,getAllUsers } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.put('/:userId', updateUser);

export default router;
