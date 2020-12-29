const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createNotesSchema = [
    check('code')
        .exists()
        .isAlphanumeric()
        .withMessage('code is required')
        .isLength({min: 1})
        .withMessage('Must be at least 3 chars long'),
    check('scode')
        .exists()
        .isAlphanumeric()
        .withMessage('Your short code is required')
        .isLength({ min: 1})
        .withMessage('Must be at least 3 chars long'),
    check('title')
        .exists()
        .withMessage('title must be required')
        .isLength({ min: 1 })
        .withMessage('Must be at least 3 chars long'),
    check('coa_type')
        .exists()
        .withMessage('UOM is required'),
    check('active')
        .exists()
        
];

exports.updateNotesSchema = [
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
    check('title')
        .exists()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('coa_type')
        .exists()
        .optional()
        .withMessage('Must be valid'),
    check('active')
         .exists(),
       
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['id','code','scode','title','coa_type','active'];
            console.log(value);
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
