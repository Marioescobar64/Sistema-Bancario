import { Router } from 'express';
import {
  getCards,
  getCardById,
  createCard,
  updateCard,
  changeCardStatus,
} from './card-controller.js';

import {
  validateCreateCard,
  validateUpdateCardRequest,
  validateCardStatusChange,
  validateGetCardById,
} from '../../middlewares/card-validation.js';

import { uploadFieldImage } from '../../middlewares/file-uploader.js';
import { cleanupUploadedFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router();

// ====================
// RUTAS GET
// ====================

/**
 * @swagger
 * /cards:
 *   get:
 *     tags: [Cards]
 *     summary: Obtener todas las tarjetas
 *     responses:
 *       200:
 *         description: Lista de tarjetas
 */
router.get('/', getCards);

/**
 * @swagger
 * /cards/{id}:
 *   get:
 *     tags: [Cards]
 *     summary: Obtener tarjeta por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarjeta
 *     responses:
 *       200:
 *         description: Tarjeta encontrada
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Tarjeta no encontrada
 */
router.get(
  '/:id',
  validateGetCardById,
  getCardById
);

// ====================
// RUTAS POST
// ====================

/**
 * @swagger
 * /cards:
 *   post:
 *     tags: [Cards]
 *     summary: Crear una nueva tarjeta
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               cardNumber:
 *                 type: string
 *               expirationDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarjeta creada exitosamente
 *       400:
 *         description: Solicitud incorrecta
 */
router.post(
  '/',
  uploadFieldImage.single('image'), // campo del form-data
  cleanupUploadedFileOnFinish,
  validateCreateCard,
  createCard
);

// ====================
// RUTAS PUT
// ====================

/**
 * @swagger
 * /cards/{id}:
 *   put:
 *     tags: [Cards]
 *     summary: Actualizar tarjeta
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarjeta
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               cardNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarjeta actualizada
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: Tarjeta no encontrada
 */
router.put(
  '/:id',
  uploadFieldImage.single('image'),
  validateUpdateCardRequest,
  updateCard
);

/**
 * @swagger
 * /cards/{id}/activate:
 *   put:
 *     tags: [Cards]
 *     summary: Activar tarjeta
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarjeta
 *     responses:
 *       200:
 *         description: Tarjeta activada
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: Tarjeta no encontrada
 */
router.put(
  '/:id/activate',
  validateCardStatusChange,
  changeCardStatus
);

/**
 * @swagger
 * /cards/{id}/deactivate:
 *   put:
 *     tags: [Cards]
 *     summary: Desactivar tarjeta
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarjeta
 *     responses:
 *       200:
 *         description: Tarjeta desactivada
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: Tarjeta no encontrada
 */
router.put(
  '/:id/deactivate',
  validateCardStatusChange,
  changeCardStatus
);

export default router;