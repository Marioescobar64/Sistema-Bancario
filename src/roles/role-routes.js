'use strict';

import { Router } from 'express';
import {
  createRole,
  getRoles,
  getRoleById,
  updateRole
} from './role-controller.js';

import {
  validateCreateRole,
  validateUpdateRole,
  validateGetRoleById
} from '../../middlewares/role-validation.js';

import { verifyToken, authorizeRoles } from '../../middlewares/auth-middleware.js';

const router = Router();

router.post(
  '/',
  verifyToken,
  authorizeRoles('ADMIN'),
  validateCreateRole,
  createRole
);

router.get(
  '/',
  verifyToken,
  authorizeRoles('ADMIN'),
  getRoles
);

router.get(
  '/:id',
  verifyToken,
  authorizeRoles('ADMIN'),
  validateGetRoleById,
  getRoleById
);

router.put(
  '/:id',
  verifyToken,
  authorizeRoles('ADMIN'),
  validateUpdateRole,
  updateRole
);

export default router;