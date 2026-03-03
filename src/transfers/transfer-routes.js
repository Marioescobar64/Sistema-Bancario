import { Router } from 'express';
import { createTransfer } from './transfer-controller.js';
import { verifyToken, authorizeRoles } from '../../middlewares/auth-middleware.js';

const router = Router();

router.post(
  '/',
  verifyToken,
  authorizeRoles('USER', 'ADMIN'),
  createTransfer
);

export default router;