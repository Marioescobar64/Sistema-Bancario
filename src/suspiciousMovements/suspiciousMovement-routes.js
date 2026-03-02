import { Router } from 'express';
import {
  getSuspiciousMovements,
  getSuspiciousMovementById,
  createSuspiciousMovement,
  updateSuspiciousMovement,
  changeSuspiciousMovementStatus,
} from './suspiciousMovement-controller.js';

import {
  validateCreateSuspiciousMovement,
  validateUpdateSuspiciousMovement,
  validateSuspiciousMovementStatusChange,
  validateGetSuspiciousMovementById,
} from '../../middlewares/suspiciousMovement-validation.js';

const router = Router();

// ====================
// GET
// ====================

router.get('/', getSuspiciousMovements);

router.get(
  '/:id',
  validateGetSuspiciousMovementById,
  getSuspiciousMovementById
);

// ====================
// POST
// ====================

router.post(
  '/',
  validateCreateSuspiciousMovement,
  createSuspiciousMovement
);

// ====================
// PUT
// ====================

router.put(
  '/:id',
  validateUpdateSuspiciousMovement,
  updateSuspiciousMovement
);

router.put(
  '/:id/review',
  validateSuspiciousMovementStatusChange,
  changeSuspiciousMovementStatus
);

router.put(
  '/:id/unreview',
  validateSuspiciousMovementStatusChange,
  changeSuspiciousMovementStatus
);

export default router;