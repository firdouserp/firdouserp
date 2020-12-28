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
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('iscashbook')
        .exists()
        .isAlphanumeric()
        .isLength({min : 1})
        .withMessage('cash book  is required'),
    check('isbankbook')
        .exists()
        .isAlphanumeric()
        .isLength({min : 1})
        .withMessage('bank book must be required'),
    check('notes')
        .exists()
        .withMessage('notes are required')
        .isAlphanumeric()
        .optional()
        .isLength({ min: 1 }),

     check('obal')
        .exists()
        .withMessage('obal is required')
        .optional()
        .isAlphanumeric()
        .isLength({ min: 1 }),
        check('active')
        .exists()
        .isAlphanumeric()
        .optional()
        .isLength({min : 1})
        .withMessage('State required'),
        
];

exports.updateCoaSchema = [
    check('code')
        .exists()
        .isAlphanumeric()
        .withMessage('code is required')
        .isLength({min: 3})
        .optional()
        .withMessage('Must be at least 3 chars long'),
    check('scode')
        .exists()
        .isAlphanumeric()
        .withMessage('Your short code is required')
        .withMessage('Can be numerical and aplhanumerical')
        .isLength({ min: 3 })
        .optional()
        .withMessage('Must be at least 3 chars long'),
    check('title')
        .exists()
        .withMessage('title must be required')
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 1 })
        .optional()
        .withMessage('Must be at least 3 chars long'),
    check('iscashbook')
        .exists()
        .isAlphanumeric()
        .isLength({min : 1})
        .optional()
        .withMessage('cash book  is required'),
    check('isbankbook')
        .exists()
        .isAlphanumeric()
        .isLength({min : 1})
        .optional()
        .withMessage('bank book must be required'),
    check('notes')
        .exists()
        .withMessage('notes are required')
        .optional()
        .isLength({ min: 1 }),

     check('obal')
        .exists()
        .isAlphanumeric()
        .withMessage('obal is required')
        .optional()
        .isLength({ min: 1 }),
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
            const allowUpdates = ['id','code', 'scode', 'title', 'iscashbook', 'isbankbook', 'notes', 'obal','active'];
            console.log(allowUpdates);
            return updates.every(update => allowUpdates.includes(update));
            
        })
        .withMessage('Invalid updates!')
];
