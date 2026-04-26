'use strict';

import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  changeUserStatus
} from './user-controller.js';

import {
  validateCreateUser,
  validateUpdateUser,
  validateUserStatusChange,
  validateGetUserById
} from '../../middlewares/user-validation.js';

import { verifyToken, authorizeRoles } from '../../middlewares/auth-middleware.js';

const router = Router();

// Crear usuario (solo ADMIN)
/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Crear un nuevo usuario
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
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
  validateCreateUser,
  createUser
);

// Obtener todos
/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Obtener todos los usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 */
router.get(
  '/',
  verifyToken,
  authorizeRoles('ADMIN'),
  getUsers
);

// Obtener por ID
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Obtener usuario por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       400:
 *         description: ID inválido
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 *       404:
 *         description: Usuario no encontrado
 */
router.get(
  '/:id',
  verifyToken,
  authorizeRoles('ADMIN'),
  validateGetUserById,
  getUserById
);

// Actualizar
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Solicitud incorrecta
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 *       404:
 *         description: Usuario no encontrado
 */
router.put(
  '/:id',
  verifyToken,
  authorizeRoles('ADMIN'),
  validateUpdateUser,
  updateUser
);

// Activar / Desactivar
/**
 * @swagger
 * /users/status/{id}:
 *   patch:
 *     summary: Cambiar estado del usuario
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
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
 *         description: Usuario no encontrado
 */
router.patch(
  '/status/:id',
  verifyToken,
  authorizeRoles('ADMIN'),
  validateUserStatusChange,
  changeUserStatus
);

export default router;