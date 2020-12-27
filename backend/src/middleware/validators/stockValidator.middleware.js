const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createStockSchema = [
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
        .withMessage('Can be numerical and aplhanumerical')
        .isLength({ min: 1})
        .withMessage('Must be at least 3 chars long'),
    check('title')
        .exists()
        .withMessage('title must be required')
        .isAlphanumeric()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 1 })
        .withMessage('Must be at least 3 chars long'),
    check('uom')
        .exists()
        .isAlphanumeric()
        .withMessage('UOM is required'),
    check('remarks')
        .exists()
        .optional({nullable:true})
        .withMessage('remarks must be required'),
    check('qty')
        .exists()
        .isAlphanumeric()
        .withMessage('Enter quantity')
        .isLength({ min: 1})
        .optional(),
     check('avg_rate')
        .exists()
        .withMessage('Enter Average Rate')
        .optional({nullable:true})
        .isLength({ min: 1 }),
     check('adv_cost')
        .exists()
        .isLength({ min: 1 })
        .isAlphanumeric()
        .withMessage('Enter advance cost'),
    check('active')
        .exists()
        .isNumeric()
        .withMessage('Enter state')
        .optional()
        .isLength({ min: 1 }),
        check('ntn')
        .optional({nullable:true}),
        
];

exports.updateStockSchema = [
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
    check('uom')
        .exists()
        .optional({nullable:true})
        .isAlphanumeric()
        .withMessage('Must be valid'),
    check('remarks')
        .exists()
        .isAlphanumeric()
        .optional({nullable:true}),
    check('qty')
        .exists()
        .optional({nullable:true})
        .isLength({ min: 1})
        .withMessage('Select Quantity')
        .isLength({ max: 10 })
        .withMessage('City can contain max 10 characters'),
    check('avg_rate')
        .exists()
        .isAlphanumeric()
        .isLength({ min: 1})
        .withMessage('Select average rates'),
    check('adv_cost')
         .exists()
        .isAlphanumeric()
        .isLength({ min: 1})
        .withMessage('Select advance cost'),
        check('active')
        .exists()
            .optional()
            .withMessage('Select state'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['code','scode','title','uom','qty','avg_rate','adv_cost','remarks','active'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
