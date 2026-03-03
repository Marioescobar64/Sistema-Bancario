import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  changeUserStatus,
} from './user-controller.js';

const router = Router();

// ====================
// RUTAS GET
// ====================

router.get('/', getUsers);

router.get('/:id', getUserById);

// ====================
// RUTAS POST
// ====================

router.post('/', createUser);

// ====================
// RUTAS PUT
// ====================

router.put('/:id', updateUser);

router.put('/:id/activate', changeUserStatus);

router.put('/:id/deactivate', changeUserStatus);

export default router;