import { body, param } from "express-validator";
import { checkValidators } from "./check-validation.js";

// ============================
// CREAR USUARIO
// ============================

export const validateCreateUser = [

body('name')
  .trim()
  .notEmpty()
  .withMessage('El nombre es obligatorio')
  .isLength({ min: 2, max: 100 })
  .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

body('email')
  .notEmpty()
  .withMessage('El correo es obligatorio')
  .isEmail()
  .withMessage('Debe ser un correo válido'),

body('password')
  .notEmpty()
  .withMessage('La contraseña es obligatoria')
  .isLength({ min: 6 })
  .withMessage('La contraseña debe tener mínimo 6 caracteres'),

body('role')
  .optional()
  .isIn(['ADMIN', 'USER'])
  .withMessage('Rol inválido'),

checkValidators,
];

// ============================
// ACTUALIZAR USUARIO
// ============================

export const validateUpdateUser = [

body('name')
  .optional()
  .trim()
  .isLength({ min: 2, max: 100 })
  .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

body('email')
  .optional()
  .isEmail()
  .withMessage('Debe ser un correo válido'),

body('password')
  .optional()
  .isLength({ min: 6 })
  .withMessage('La contraseña debe tener mínimo 6 caracteres'),

body('role')
  .optional()
  .isIn(['ADMIN', 'USER'])
  .withMessage('Rol inválido'),

checkValidators,
];

// ============================
// ACTIVAR / DESACTIVAR
// ============================

export const validateUserStatusChange = [
param('id')
  .isMongoId()
  .withMessage('ID debe ser un ObjectId válido'),
checkValidators,
];

// ============================
// GET BY ID
// ============================

export const validateGetUserById = [
param('id')
  .isMongoId()
  .withMessage('ID debe ser un ObjectId válido'),
checkValidators,
];