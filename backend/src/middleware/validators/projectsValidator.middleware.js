const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createProjectsSchema = [
    check('code')
        .exists()
        .withMessage('code is required'),
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
        .isLength({min : 2}),
    check('location')
        .exists()
        .withMessage('Location is required'),
    check('client')
        .exists()
        .withMessage('client must be required')
        .isLength({min : 1}),
    check('city')
        .exists()
        .withMessage('Your city')
        .isLength({min:3}),

    check('cost')
        .exists()
        .withMessage('Your cost')
        .isAlphanumeric()
        .isLength({ min:1}),
    check('nature')
        .exists()
        .withMessage('Enter nature')
        .isLength({min : 1}),
    check('remarks')
        .exists()
        .withMessage('Any remarks please'),
    check('active')
        .exists()
        .isAlphanumeric()
        .withMessage('State required')
        .isLength({min:1}),
        
];

exports.updateProjectsSchema = [
    check('code')
        .optional()    
        .isAlphanumeric()
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('scode')
        .isAlphanumeric()
        .optional()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('unit')
        .exists()
        .withMessage('Unit is required'),
    check('title')
        .exists()
        .optional()
        .withMessage('title require')
        .isLength({ min: 1 }),
    check('location')
         .optional({nullable:true})
        .isAlphanumeric()
        .withMessage('Must be a valid location'),
    check('client')
        .optional(),
    check('city')
        .optional({nullable:true})
        .isLength({ min: 3})
        .withMessage('Select City')
        .isLength({ max: 10 })
        .withMessage('City can contain max 10 characters'),
    check('cost')
        .exists()
        .isAlphanumeric()
        .optional()
        .withMessage('Select Cost'),
    check('nature')
        .exists()
        .withMessage('Enter nature')
        .optional()
        .isAlphanumeric()
        .isLength({min : 1}),
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
            const allowUpdates = ['id','code', 'scode','unit', 'title', 'location', 'city', 'client', 'cost', 'nature', 'remarks', 'active'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
