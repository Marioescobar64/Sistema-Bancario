import { Router } from 'express';
import {
  getTransferencias,
  getTransferenciaById,
  createTransferencia,
  updateTransferencia,
  changeTransferenciaStatus,
} from './transfer-controller.js';

import {
  validateCreateTransferencia,
  validateUpdateTransferenciaRequest,
  validateTransferenciaStatusChange,
  validateGetTransferenciaById,
} from '../../middlewares/transfer-validation.js';

const router = Router();

// ====================
// RUTAS GET
// ====================

router.get('/', getTransferencias);

router.get(
  '/:id',
  validateGetTransferenciaById,
  getTransferenciaById
);

// ====================
// RUTAS POST
// ====================

router.post(
  '/',
  validateCreateTransferencia,
  createTransferencia
);

// ====================
// RUTAS PUT
// ====================

router.put(
  '/:id',
  validateUpdateTransferenciaRequest,
  updateTransferencia
);

router.put(
  '/:id/activate',
  validateTransferenciaStatusChange,
  changeTransferenciaStatus
);

router.put(
  '/:id/deactivate',
  validateTransferenciaStatusChange,
  changeTransferenciaStatus
);

export default router;