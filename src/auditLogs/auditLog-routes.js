import { Router } from 'express';
import {
  getAuditLogs,
  getAuditLogById,
} from './auditLog-controller.js';

const router = Router();

// ====================
// RUTAS GET
// ====================

router.get('/', getAuditLogs);

router.get('/:id', getAuditLogById);

export default router;