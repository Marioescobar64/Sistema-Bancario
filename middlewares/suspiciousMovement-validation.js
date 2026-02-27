import { body, param } from "express-validator";
import { checkValidators } from "./check-validation.js";

// ==============================
// Validaciones para crear movimiento sospechoso
// ==============================

export const validateCreateSuspiciousMovement = [

  body('transaccion')
    .trim()
    .notEmpty()
    .withMessage('El ID o número de la transacción es obligatorio'),

  body('tipoAlerta')
    .trim()
    .notEmpty()
    .withMessage('El tipo de alerta es obligatorio'),

  body('descripcion')
    .trim()
    .notEmpty()
    .withMessage('La descripción es obligatoria')
    .isLength({ min: 5 })
    .withMessage('La descripción debe tener al menos 5 caracteres'),

  body('fecha')
    .optional()
    .isISO8601()
    .withMessage('La fecha debe ser válida'),

  checkValidators,
];

// ==============================
// Validaciones para actualizar movimiento sospechoso
// ==============================

export const validateUpdateSuspiciousMovement = [

  body('transaccion')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El ID o número de la transacción no puede estar vacío'),

  body('tipoAlerta')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El tipo de alerta no puede estar vacío'),

  body('descripcion')
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage('La descripción debe tener al menos 5 caracteres'),

  body('fecha')
    .optional()
    .isISO8601()
    .withMessage('La fecha debe ser válida'),

  checkValidators,
];

// ==============================
// Validaciones para cambiar estado (review / unreview)
// ==============================

export const validateSuspiciousMovementStatusChange = [
  param('id')
    .isMongoId()
    .withMessage('El ID debe ser un ObjectId válido de MongoDB'),

  checkValidators,
];

// ==============================
// Validación para obtener por ID
// ==============================

export const validateGetSuspiciousMovementById = [
  param('id')
    .isMongoId()
    .withMessage('El ID debe ser un ObjectId válido de MongoDB'),

  checkValidators,
];