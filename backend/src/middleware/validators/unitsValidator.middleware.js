const { body, check } = require('express-validator');
const Role =require('../../utils/userRoles.utils');


exports.createUnitsSchema = [
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
        .isLength({ min: 3 }),
    check('utype')
        .exists()
        .withMessage('Unit type is required'),
    check('ulocation')
        .exists()
        .withMessage('Unit location must be required'),
    check('usize')
        .exists(),
    check('remarks')
        .exists()
        .withMessage('Enter remarks')
        .optional({nullable:true})
        .isLength({ min: 2 }),
    check('active')
        .exists()
        .optional()
        .withMessage('State required'),
        
];

exports.updateUnitsSchema = [
    check('code')
    .exists()
    .optional()    
    .isAlphanumeric()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('scode')
        .exists()
        .optional()
        .isAlphanumeric()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('title')
        .exists()
        .optional()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('ulocation')
        .exists()
        .optional()
        .isNumeric()
        .withMessage('Must be a valid location'),
    check('utype')
        .exists()
        .optional(),
    check('usize')
        .exists()
        .optional()
        .isLength({ min: 3})
        .withMessage('Select City')
        .isLength({ max: 10 })
        .withMessage('City can contain max 10 characters'),
    check('remarks')
        .exists()
        .optional({nullable:true})
        .withMessage('Any remarks'),
    check('active')
        .exists()
        .optional()
        .withMessage('Define state'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['code','scode','title','utype','ulocation','usize','remarks','active'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
