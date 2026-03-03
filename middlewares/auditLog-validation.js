import { param } from "express-validator";
import { checkValidators } from "./check-validation.js";

export const validateGetAuditLogById = [
param('id')
  .isMongoId()
  .withMessage('ID inválido'),
checkValidators,
];