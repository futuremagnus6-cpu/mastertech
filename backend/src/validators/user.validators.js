const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const {
  requiredString, optionalString, requiredEmail, optionalEmail,
  requiredPhone, optionalEnum, requiredEnum,
  password, optionalObject,
} = require('./common.validators');

const USER_ROLES = ['super_admin', 'shop_admin', 'manager', 'staff'];

const createUserValidator = [
  requiredString('name', { min: 2, max: 100 }),
  requiredEmail('email'),
  requiredPhone('phone'),
  password('password'),
  requiredEnum('role', USER_ROLES),
  validate,
];

const updateUserValidator = [
  optionalString('name', { max: 100 }),
  optionalEmail('email'),
  optionalPhone('phone'),
  optionalEnum('role', USER_ROLES),
  optionalBoolean('isActive'),
  optionalObject('permissions'),
  validate,
];

const updatePermissionsValidator = [
  requiredObject('permissions'),
  validate,
];

// ─── Employee ───

const EMPLOYEE_ROLES = ['manager', 'cashier', 'sales', 'delivery', 'other'];

const createEmployeeValidator = [
  optionalString('name', { max: 100 }),
  optionalEmail('email'),
  optionalString('phone', { max: 20 }),
  optionalString('mobile', { max: 20 }),
  optionalString('position', { max: 100 }),
  optionalString('department', { max: 100 }),
  optionalString('designation', { max: 100 }),
  optionalString('employeeCode', { max: 50 }),
  optionalString('userRole', { max: 50 }),
  optionalEnum('role', EMPLOYEE_ROLES),
  optionalNumber('salary', { min: 0 }),
  optionalObject('salary'),
  optionalObject('address'),
  optionalString('gender', { max: 20 }),
  optionalDate('doj'),
  optionalDate('joiningDate'),
  optionalBoolean('isActive'),
  optionalBoolean('hasLogin'),
  optionalString('loginEmail', { max: 200 }),
  optionalString('password', { max: 200 }),
  optionalString('emergencyContact', { max: 20 }),
  optionalNumber('priority', { min: 0 }),
  validate,
];

const updateEmployeeValidator = [
  optionalString('name', { max: 100 }),
  optionalEmail('email'),
  optionalString('phone', { max: 20 }),
  optionalString('mobile', { max: 20 }),
  optionalString('position', { max: 100 }),
  optionalString('department', { max: 100 }),
  optionalString('designation', { max: 100 }),
  optionalString('employeeCode', { max: 50 }),
  optionalString('userRole', { max: 50 }),
  optionalEnum('role', EMPLOYEE_ROLES),
  optionalNumber('salary', { min: 0 }),
  optionalObject('salary'),
  optionalObject('address'),
  optionalString('gender', { max: 20 }),
  optionalDate('doj'),
  optionalDate('joiningDate'),
  optionalBoolean('isActive'),
  optionalBoolean('hasLogin'),
  optionalString('loginEmail', { max: 200 }),
  optionalString('password', { max: 200 }),
  optionalString('emergencyContact', { max: 20 }),
  optionalNumber('priority', { min: 0 }),
  validate,
];

function optionalBoolean(field) {
  return body(field)
    .optional({ values: 'null' })
    .isBoolean().withMessage(`${field} must be a boolean`);
}

function optionalNumber(field, { min, max } = {}) {
  let chain = body(field)
    .optional({ values: 'null' })
    .isFloat().withMessage(`${field} must be a number`);
  if (min !== undefined) chain = chain.isFloat({ min }).withMessage(`${field} must be at least ${min}`);
  if (max !== undefined) chain = chain.isFloat({ max }).withMessage(`${field} must be at most ${max}`);
  return chain;
}

function optionalDate(field) {
  return body(field)
    .optional({ values: 'null' })
    .isISO8601().withMessage(`${field} must be a valid ISO 8601 date`);
}

function requiredObject(field) {
  return body(field)
    .notEmpty().withMessage(`${field} is required`)
    .isObject().withMessage(`${field} must be an object`);
}

module.exports = {
  createUserValidator,
  updateUserValidator,
  updatePermissionsValidator,
  createEmployeeValidator,
  updateEmployeeValidator,
};
