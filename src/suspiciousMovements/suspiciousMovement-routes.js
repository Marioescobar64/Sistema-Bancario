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

/**
 * @swagger
 * /suspicious:
 *   get:
 *     tags: [Suspicious Movements]
 *     summary: Obtener todos los movimientos sospechosos
 *     responses:
 *       200:
 *         description: Lista de movimientos sospechosos
 */
router.get('/', getSuspiciousMovements);

/**
 * @swagger
 * /suspicious/{id}:
 *   get:
 *     tags: [Suspicious Movements]
 *     summary: Obtener movimiento sospechoso por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del movimiento sospechoso
 *     responses:
 *       200:
 *         description: Movimiento encontrado
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Movimiento no encontrado
 */
router.get(
  '/:id',
  validateGetSuspiciousMovementById,
  getSuspiciousMovementById
);

// ====================
// POST
// ====================

/**
 * @swagger
 * /suspicious:
 *   post:
 *     tags: [Suspicious Movements]
 *     summary: Crear un nuevo movimiento sospechoso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *               accountId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Movimiento creado exitosamente
 *       400:
 *         description: Solicitud incorrecta
 */
router.post(
  '/',
  validateCreateSuspiciousMovement,
  createSuspiciousMovement
);

// ====================
// PUT
// ====================

/**
 * @swagger
 * /suspicious/{id}:
 *   put:
 *     tags: [Suspicious Movements]
 *     summary: Actualizar movimiento sospechoso
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del movimiento sospechoso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movimiento actualizado
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: Movimiento no encontrado
 */
router.put(
  '/:id',
  validateUpdateSuspiciousMovement,
  updateSuspiciousMovement
);

/**
 * @swagger
 * /suspicious/{id}/review:
 *   put:
 *     tags: [Suspicious Movements]
 *     summary: Revisar movimiento sospechoso
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del movimiento sospechoso
 *     responses:
 *       200:
 *         description: Movimiento revisado
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: Movimiento no encontrado
 */
router.put(
  '/:id/review',
  validateSuspiciousMovementStatusChange,
  changeSuspiciousMovementStatus
);

/**
 * @swagger
 * /suspicious/{id}/unreview:
 *   put:
 *     tags: [Suspicious Movements]
 *     summary: Desmarcar revisión de movimiento sospechoso
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del movimiento sospechoso
 *     responses:
 *       200:
 *         description: Revisión desmarcada
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: Movimiento no encontrado
 */
router.put(
  '/:id/unreview',
  validateSuspiciousMovementStatusChange,
  changeSuspiciousMovementStatus
);

export default router;