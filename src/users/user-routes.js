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
router.post(
  '/',
  verifyToken,
  authorizeRoles('ADMIN'),
  validateCreateUser,
  createUser
);

// Obtener todos
router.get(
  '/',
  verifyToken,
  authorizeRoles('ADMIN'),
  getUsers
);

// Obtener por ID
router.get(
  '/:id',
  verifyToken,
  authorizeRoles('ADMIN'),
  validateGetUserById,
  getUserById
);

// Actualizar
router.put(
  '/:id',
  verifyToken,
  authorizeRoles('ADMIN'),
  validateUpdateUser,
  updateUser
);

// Activar / Desactivar
router.patch(
  '/status/:id',
  verifyToken,
  authorizeRoles('ADMIN'),
  validateUserStatusChange,
  changeUserStatus
);

export default router;