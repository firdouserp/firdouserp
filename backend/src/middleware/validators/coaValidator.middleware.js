const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createCoaSchema = [
    check('code')
        .exists()
        .isAlphanumeric()
        .withMessage('code is required')
        .isLength({min: 3})
        .withMessage('Must be at least 3 chars long'),
    check('scode')
        .exists()
        .isAlphanumeric()
        .withMessage('Your short code is required')
        .withMessage('Can be numerical and aplhanumerical')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('title')
        .exists()
        .withMessage('title must be required')
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('iscashbook')
        .exists()
        .isAlphanumeric()
        .withMessage('cash book  is required'),
    check('isbankbook')
        .exists()
        .isAlphanumeric()
        .withMessage('bank book must be required'),
    check('notes')
        .exists()
        .withMessage('notes are required')
        .optional()
        .isLength({ min: 3 }),

     check('obal')
        .exists()
        .withMessage('obal is required')
        .optional()
        .isLength({ min: 2 }),
        check('active')
        .exists()
        .optional()
        .withMessage('State required'),
        
];

exports.updateCoaSchema = [
    check('code')
        .exists()
        .isAlphanumeric()
        .withMessage('code is required')
        .isLength({min: 3})
        .withMessage('Must be at least 3 chars long'),
    check('scode')
        .exists()
        .isAlphanumeric()
        .withMessage('Your short code is required')
        .withMessage('Can be numerical and aplhanumerical')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('title')
        .exists()
        .withMessage('title must be required')
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('iscashbook')
        .exists()
        .isAlphanumeric()
        .withMessage('cash book  is required'),
    check('isbankbook')
        .exists()
        .isAlphanumeric()
        .withMessage('bank book must be required'),
    check('notes')
        .exists()
        .withMessage('notes are required')
        .optional()
        .isLength({ min: 3 }),

     check('obal')
        .exists()
        .withMessage('obal is required')
        .optional()
        .isLength({ min: 2 }),
        check('active')
        .exists()
        .optional()
        .withMessage('State required'),

    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['code, scode, title, iscashbook, isbankbook, notes, obal,active = Role.SuperUser'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
