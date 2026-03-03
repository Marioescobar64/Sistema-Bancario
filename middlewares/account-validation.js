import { body, param } from "express-validator";
import { checkValidators } from "./check-validation.js";

export const validateCreateAccount = [

body('user')
  .notEmpty()
  .withMessage('El usuario es obligatorio')
  .isMongoId()
  .withMessage('Debe ser un ObjectId válido'),

body('accountNumber')
  .notEmpty()
  .withMessage('El número de cuenta es obligatorio'),

body('balance')
  .optional()
  .isNumeric()
  .withMessage('El saldo debe ser numérico'),

body('type')
  .notEmpty()
  .withMessage('El tipo de cuenta es obligatorio')
  .isIn(['AHORRO', 'MONETARIA'])
  .withMessage('Tipo de cuenta inválido'),

checkValidators,
];

export const validateUpdateAccount = [

body('balance')
  .optional()
  .isNumeric()
  .withMessage('El saldo debe ser numérico'),

body('type')
  .optional()
  .isIn(['AHORRO', 'MONETARIA'])
  .withMessage('Tipo de cuenta inválido'),

checkValidators,
];

export const validateAccountStatusChange = [
param('id')
  .isMongoId()
  .withMessage('ID inválido'),
checkValidators,
];

export const validateGetAccountById = [
param('id')
  .isMongoId()
  .withMessage('ID inválido'),
checkValidators,
];