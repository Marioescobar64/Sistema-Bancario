'use strict';

import { Router } from 'express';
import {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  changeAccountStatus,
  depositMoney,
  withdrawMoney
} from './account-controller.js';

import {
  validateCreateAccount,
  validateUpdateAccount,
  validateAccountStatusChange,
  validateGetAccountById
} from '../../middlewares/account-validation.js';

import { verifyToken, authorizeRoles } from '../../middlewares/auth-middleware.js';

const router = Router();

// Crear cuenta (ADMIN)
/**
 * @swagger
 * /accounts:
 *   post:
 *     tags: [Accounts]
 *     summary: Crear una nueva cuenta
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               accountType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cuenta creada exitosamente
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
  authorizeRoles('ADMIN', 'USER'),
  validateCreateAccount,
  createAccount
);

// Obtener cuentas
/**
 * @swagger
 * /accounts:
 *   get:
 *     tags: [Accounts]
 *     summary: Obtener todas las cuentas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cuentas
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 */
router.get(
  '/',
  verifyToken,
  authorizeRoles('ADMIN', 'USER'),
  getAccounts
);

// Obtener por ID
/**
 * @swagger
 * /accounts/{id}:
 *   get:
 *     tags: [Accounts]
 *     summary: Obtener cuenta por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la cuenta
 *     responses:
 *       200:
 *         description: Cuenta encontrada
 *       400:
 *         description: ID inválido
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 *       404:
 *         description: Cuenta no encontrada
 */
router.get(
  '/:id',
  verifyToken,
  authorizeRoles('ADMIN', 'USER'),
  validateGetAccountById,
  getAccountById
);

// Actualizar
/**
 * @swagger
 * /accounts/{id}:
 *   put:
 *     tags: [Accounts]
 *     summary: Actualizar cuenta
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la cuenta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cuenta actualizada
 *       400:
 *         description: Solicitud incorrecta
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 *       404:
 *         description: Cuenta no encontrada
 */
router.put(
  '/:id',
  verifyToken,
  authorizeRoles('ADMIN'),
  validateUpdateAccount,
  updateAccount
);

// Activar / Desactivar
/**
 * @swagger
 * /accounts/status/{id}:
 *   patch:
 *     tags: [Accounts]
 *     summary: Cambiar estado de la cuenta
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la cuenta
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
 *         description: Cuenta no encontrada
 */
router.patch(
  '/status/:id',
  verifyToken,
  authorizeRoles('ADMIN'),
  validateAccountStatusChange,
  changeAccountStatus
);

/**
 * @swagger
 * /accounts/deposit/{id}:
 *   patch:
 *     tags: [Accounts]
 *     summary: Depositar dinero en la cuenta
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la cuenta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Depósito realizado
 *       400:
 *         description: Solicitud incorrecta
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 *       404:
 *         description: Cuenta no encontrada
 */
router.patch(
  '/deposit/:id',
  verifyToken,
  authorizeRoles('ADMIN', 'USER'),
  depositMoney
);

/**
 * @swagger
 * /accounts/withdraw/{id}:
 *   patch:
 *     tags: [Accounts]
 *     summary: Retirar dinero de la cuenta
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la cuenta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Retiro realizado
 *       400:
 *         description: Solicitud incorrecta
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 *       404:
 *         description: Cuenta no encontrada
 */
router.patch(
  '/withdraw/:id',
  verifyToken,
  authorizeRoles('ADMIN', 'USER'),
  withdrawMoney
);

export default router;