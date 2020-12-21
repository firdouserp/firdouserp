const { body, check } = require('express-validator');
const Role = require('../utils/userRoles.utils');


exports.createProjectsSchema = [
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
    check('location')
        .exists()
        .isAlphanumeric()
        .withMessage('Location is required'),
    check('client')
        .exists()
        .withMessage('client must be required'),
    check('city')
        .exists()
        .withMessage('Your city')
        .optional()
        .isLength({ min: 3 }),

     check('cost')
        .exists()
        .withMessage('Your cost')
        .optional()
        .isLength({ min: 2 }),
    check('remarks')
        .exists()
        .optional()
        .withMessage('Any remarks please'),
        check('active')
        .exists()
        .optional()
        .withMessage('State required'),
        
];

exports.updateProjectsSchema = [
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
        .optional()
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('location')
        .optional()
        .isAlphanumeric()
        .withMessage('Must be a valid location'),
    check('client')
        .optional(),
    check('city')
        .optional()
        .isLength({ min: 3})
        .withMessage('Select City')
        .isLength({ max: 10 })
        .withMessage('City can contain max 10 characters'),
    check('cost')
    .exists()
        .optional()
        .withMessage('Select Cost'),
    check('remarks')
    .exists()
        .optional()
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
            const allowUpdates = ['code, scode, title, location, city, client, cost, nature, remakrs, active = Role.SuperUser'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
