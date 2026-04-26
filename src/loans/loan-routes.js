'use strict';

import { Router } from 'express';
import {
  createLoan,
  getLoans,
  getLoanById,
  updateLoan,
  changeLoanStatus
} from './loan-controller.js';

import {
  validateCreateLoan,
  validateUpdateLoan,
  validateLoanStatusChange,
  validateGetLoanById
} from '../../middlewares/loan-validation.js';

import { verifyToken, authorizeRoles } from '../../middlewares/auth-middleware.js';

const router = Router();

/**
 * @swagger
 * /loans:
 *   post:
 *     tags: [Loans]
 *     summary: Crear un nuevo préstamo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               interestRate:
 *                 type: number
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Préstamo creado exitosamente
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
  authorizeRoles('ADMIN'),
  validateCreateLoan,
  createLoan
);

/**
 * @swagger
 * /loans:
 *   get:
 *     tags: [Loans]
 *     summary: Obtener todos los préstamos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de préstamos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 */
router.get(
  '/',
  verifyToken,
  authorizeRoles('ADMIN', 'USER'),
  getLoans
);

/**
 * @swagger
 * /loans/{id}:
 *   get:
 *     tags: [Loans]
 *     summary: Obtener préstamo por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del préstamo
 *     responses:
 *       200:
 *         description: Préstamo encontrado
 *       400:
 *         description: ID inválido
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 *       404:
 *         description: Préstamo no encontrado
 */
router.get(
  '/:id',
  verifyToken,
  authorizeRoles('ADMIN', 'USER'),
  validateGetLoanById,
  getLoanById
);

/**
 * @swagger
 * /loans/{id}:
 *   put:
 *     tags: [Loans]
 *     summary: Actualizar préstamo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del préstamo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Préstamo actualizado
 *       400:
 *         description: Solicitud incorrecta
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 *       404:
 *         description: Préstamo no encontrado
 */
router.put(
  '/:id',
  verifyToken,
  authorizeRoles('ADMIN'),
  validateUpdateLoan,
  updateLoan
);

/**
 * @swagger
 * /loans/status/{id}:
 *   patch:
 *     tags: [Loans]
 *     summary: Cambiar estado del préstamo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del préstamo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Estado cambiado
 *       400:
 *         description: Solicitud incorrecta
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 *       404:
 *         description: Préstamo no encontrado
 */
router.patch(
  '/status/:id',
  verifyToken,
  authorizeRoles('ADMIN'),
  validateLoanStatusChange,
  changeLoanStatus
);

export default router;