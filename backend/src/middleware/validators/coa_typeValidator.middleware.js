const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createCoa_typeSchema = [
    check('code')
        .exists()
        .isAlphanumeric()
        .withMessage('code is required')
        .isLength({min: 1})
        .withMessage('Must be at least 1 chars long'),
    check('title')
        .exists()
        .withMessage('Your title is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
        
];

exports.updateCoa_typeSchema = [
    check('code')
        .exists()
        .isAlphanumeric()
        .withMessage('code is required')
        .isLength({min: 1})
        .withMessage('Must be at least 3 chars long'),
    check('title')
        .exists()
        .withMessage('title must be required')
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['id','code', 'title'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
