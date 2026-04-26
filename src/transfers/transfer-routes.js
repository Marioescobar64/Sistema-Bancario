'use strict';

import { Router } from 'express';
import { createTransfer, getTransfers } from './transfer-controller.js';
import { validateCreateTransferencia } from '../../middlewares/transfer-validation.js';
import { verifyToken, authorizeRoles } from '../../middlewares/auth-middleware.js';

const router = Router();

// Crear transferencia
/**
 * @swagger
 * /transfers:
 *   post:
 *     tags: [Transfers]
 *     summary: Crear una nueva transferencia
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromAccountId:
 *                 type: string
 *               toAccountId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Transferencia creada exitosamente
 *       400:
 *         description: Solicitud incorrecta
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 */
router.post(
  '/',
  verifyToken,
  authorizeRoles('USER', 'ADMIN'),
  validateCreateTransferencia,
  createTransfer
);

// Obtener historial
/**
 * @swagger
 * /transfers:
 *   get:
 *     tags: [Transfers]
 *     summary: Obtener historial de transferencias
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de transferencias
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 */
router.get(
  '/',
  verifyToken,
  authorizeRoles('USER', 'ADMIN'),
  getTransfers
);

export default router;