import { Router } from 'express';
import {
  getAuditLogs,
  getAuditLogById,
} from './auditLog-controller.js';

const router = Router();

// ====================
// RUTAS GET
// ====================

/**
 * @swagger
 * /auditLogs:
 *   get:
 *     tags: [Audit Logs]
 *     summary: Obtener todos los registros de auditoría
 *     responses:
 *       200:
 *         description: Lista de registros de auditoría
 */
router.get('/', getAuditLogs);

/**
 * @swagger
 * /auditLogs/{id}:
 *   get:
 *     tags: [Audit Logs]
 *     summary: Obtener registro de auditoría por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del registro de auditoría
 *     responses:
 *       200:
 *         description: Registro encontrado
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Registro no encontrado
 */
router.get('/:id', getAuditLogById);

export default router;