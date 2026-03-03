import { body, param } from "express-validator";
import { checkValidators } from "./check-validation.js";

export const validateCreateRole = [

body('name')
  .notEmpty()
  .withMessage('El nombre del rol es obligatorio')
  .isIn(['ADMIN', 'USER'])
  .withMessage('Rol inválido'),

checkValidators,
];

export const validateUpdateRole = [

body('name')
  .optional()
  .isIn(['ADMIN', 'USER'])
  .withMessage('Rol inválido'),

checkValidators,
];

export const validateGetRoleById = [
param('id')
  .isMongoId()
  .withMessage('ID inválido'),
checkValidators,
];