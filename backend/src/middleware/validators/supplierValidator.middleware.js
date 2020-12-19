const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createSupplierSchema = [
    check('code')
        .exists()
        .withMessage('code is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('scode')
        .exists()
        .withMessage('Your short code is required')
        .withMessage('Can be numerical and aplhanumerical')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('person')
        .exists()
        .withMessage('person must be required')
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('contact')
        .exists()
        .withMessage('Contact is required'),
    check('address')
        .withMessage('Address must be required'),
    check('city')
        .withMessage('Your city')
        .optional()
        .isLength({ min: 2 }),

        check('country')
        .withMessage('Your Country')
        .optional()
        .isLength({ min: 2 }),
        check('email')
        .withMessage('Your Email')
        .optional()
        .isLength({ min: 2 }),
        check('fax')
        .withMessage('Your Fax')
        .optional()
        .isLength({ min: 2 }),
        check('ntn')
        .withMessage('Your NTN')
        .optional()
        .isLength({ min: 2 }),
    check('cnic')
        .exists()
        .withMessage('CNIC should be valid'),
        check('businesstitle')
        .exists()
        .withMessage('Business Tittle is required'),
    check('nature')
        .optional()
        .isAlpha()
        .withMessage('Business nature')
        
];

exports.updateSuppliersSchema = [
    check('code')
    .optional()    
    .isAlphanumeric()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('scode')
        .optional()
        .isAlphanumeric()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('person')
        .optional()
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('contact')
        .optional()
        .isNumeric()
        .withMessage('Must be a valid contact'),
    check('address')
        .optional(),
    check('city')
        .optional()
        .isLength({ min: 3})
        .withMessage('Select City')
        .isLength({ max: 10 })
        .withMessage('City can contain max 10 characters'),
    check('country')
        .optional()
        .withMessage('Select Country'),
    check('businesstitle')
        .optional()
        .withMessage('Must be a business title'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['code,scode,title,person,contact,address,city,country,email,fax,ntn,stn,cnic,businesstitle,nature,active'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.validateLogin = [
    check('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    check('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];