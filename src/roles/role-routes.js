import { Router } from 'express';
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from './role-controller.js';

const router = Router();

// ====================
// RUTAS GET
// ====================

router.get('/', getRoles);

router.get('/:id', getRoleById);

// ====================
// RUTAS POST
// ====================

router.post('/', createRole);

// ====================
// RUTAS PUT
// ====================

router.put('/:id', updateRole);

// ====================
// RUTAS DELETE
// ====================

router.delete('/:id', deleteRole);

export default router;