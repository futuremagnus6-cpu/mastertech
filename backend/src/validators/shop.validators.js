const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const {
  requiredString, optionalString, requiredEmail, optionalEmail,
  requiredPhone, optionalPhone, gstin, pan, pincode, colorHex,
  currency, timezone, dateFormat, language, requiredBoolean,
  optionalBoolean, optionalInt, requiredInt, optionalObject,
  requiredEnum, optionalEnum, optionalUrl, password,
} = require('./common.validators');

const BUSINESS_TYPES = [
  'medical_store', 'pharmacy', 'distributor', 'grocery_store',
  'supermarket', 'electronics_shop', 'mobile_shop', 'cosmetics_shop',
  'hardware_shop', 'riyansh_mlm', 'custom',
];
const SHOP_STATUSES = ['active', 'inactive', 'suspended', 'disabled'];
const SUB_STATUSES = ['active', 'trial', 'expired', 'suspended', 'cancelled'];

const registerShopValidator = [
  // Shop details
  requiredString('name', { min: 2, max: 200 }),
  requiredEnum('businessType', BUSINESS_TYPES),
  optionalString('customBusinessType', { max: 100 }),
  gstin(),
  pan(),

  // Address (nested object)
  body('address.line1')
    .trim()
    .notEmpty().withMessage('address.line1 is required')
    .isString().withMessage('address.line1 must be a string')
    .isLength({ max: 500 }).withMessage('address.line1 must be at most 500 characters'),
  body('address.line2')
    .optional({ values: 'null' })
    .trim()
    .isString().withMessage('address.line2 must be a string')
    .isLength({ max: 500 }).withMessage('address.line2 must be at most 500 characters'),
  body('address.city')
    .trim()
    .notEmpty().withMessage('address.city is required')
    .isString().withMessage('address.city must be a string')
    .isLength({ max: 100 }).withMessage('address.city must be at most 100 characters'),
  body('address.state')
    .trim()
    .notEmpty().withMessage('address.state is required')
    .isString().withMessage('address.state must be a string')
    .isLength({ max: 100 }).withMessage('address.state must be at most 100 characters'),
  body('address.pincode')
    .trim()
    .notEmpty().withMessage('address.pincode is required')
    .matches(/^\d{6}$/).withMessage('Pincode must be a 6-digit number'),
  body('address.country')
    .trim()
    .notEmpty().withMessage('address.country is required')
    .isString().withMessage('address.country must be a string')
    .isLength({ max: 100 }).withMessage('address.country must be at most 100 characters'),

  // Contact (nested object)
  body('contact.email')
    .trim()
    .notEmpty().withMessage('contact.email is required')
    .isEmail().withMessage('Please provide a valid contact email')
    .normalizeEmail()
    .isLength({ max: 254 }).withMessage('contact.email must be at most 254 characters'),
  body('contact.phone')
    .trim()
    .notEmpty().withMessage('contact.phone is required')
    .matches(/^\+?[\d\s\-()]{7,20}$/).withMessage('Please provide a valid phone number'),
  body('contact.website')
    .optional({ values: 'null' })
    .trim()
    .custom((value) => {
      if (!value) return true;
      if (/^https?:\/\/.+/i.test(value)) return true;
      throw new Error('Please provide a valid URL');
    }),

  // Admin credentials
  requiredString('adminName', { min: 2, max: 100 }),
  requiredEmail('adminEmail'),
  password(),
  validate,
];

const createShopValidator = [
  requiredString('name', { min: 2, max: 200 }),
  requiredEnum('businessType', BUSINESS_TYPES),
  optionalString('customBusinessType', { max: 100 }),
  gstin(),
  pan(),
  optionalString('address', { max: 500 }),
  optionalString('addressLine2', { max: 500 }),
  optionalString('city', { max: 100 }),
  optionalString('state', { max: 100 }),
  pincode().optional({ values: 'null' }),
  optionalString('country', { max: 100 }),
  optionalPhone('phone'),
  optionalEmail('email'),
  optionalUrl('website'),
  requiredEmail('adminEmail'),
  optionalString('adminName', { max: 100 }),
  validate,
];

const updateShopValidator = [
  optionalString('name', { max: 200 }),
  optionalEnum('businessType', BUSINESS_TYPES),
  optionalString('customBusinessType', { max: 100 }),
  gstin(),
  pan(),
  optionalString('address', { max: 500 }),
  optionalString('addressLine2', { max: 500 }),
  optionalString('city', { max: 100 }),
  optionalString('state', { max: 100 }),
  pincode().optional({ values: 'null' }),
  optionalString('country', { max: 100 }),
  optionalPhone('phone'),
  optionalEmail('email'),
  optionalUrl('website'),
  optionalString('logo', { max: 500 }),
  optionalObject('branding'),
  optionalObject('features'),
  optionalObject('limits'),
  optionalString('status', { max: 20 }),
  validate,
];

const extendTrialValidator = [
  body('days')
    .optional({ values: 'null' })
    .isInt({ min: 1, max: 90 }).withMessage('Days must be an integer between 1 and 90')
    .toInt(),
  validate,
];

const closeTrialValidator = [validate];

const sendAnnouncementValidator = [
  requiredString('subject', { min: 1, max: 200 }),
  requiredString('message', { min: 1, max: 10000 }),
  optionalEnum('type', ['general', 'offer', 'reminder', 'update']),
  validate,
];

module.exports = {
  registerShopValidator,
  createShopValidator,
  updateShopValidator,
  extendTrialValidator,
  closeTrialValidator,
  sendAnnouncementValidator,
};
