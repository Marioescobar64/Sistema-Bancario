import { Router } from 'express';
import {
  getLoans,
  getLoanById,
  createLoan,
  updateLoan,
  changeLoanStatus,
} from './loan-controller.js';

const router = Router();

// ====================
// RUTAS GET
// ====================

router.get('/', getLoans);

router.get('/:id', getLoanById);

// ====================
// RUTAS POST
// ====================

router.post('/', createLoan);

// ====================
// RUTAS PUT
// ====================

router.put('/:id', updateLoan);

router.put('/:id/approve', changeLoanStatus);

router.put('/:id/reject', changeLoanStatus);

router.put('/:id/pay', changeLoanStatus);

export default router;