import { Router } from 'express';
import {
  getAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  changeAccountStatus,
} from './account-controller.js';

const router = Router();

router.get('/', getAccounts);
router.get('/:id', getAccountById);

router.post('/', createAccount);

router.put('/:id', updateAccount);

router.put('/:id/activate', changeAccountStatus);
router.put('/:id/deactivate', changeAccountStatus);

export default router;