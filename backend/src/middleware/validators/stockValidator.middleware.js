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
        .optional({nullable:true})
        .withMessage('Must be at least 3 chars long'),
    check('title')
        .exists()
        .optional({nullable:true})
        .withMessage('title must be required'),
    check('uom')
        .exists()
        .optional({nullable:true}),
    check('remarks')
        .exists()
        .optional({nullable:true})
        .withMessage('remarks must be required'),
    check('qty')
        .exists()
        .optional({nullable:true}),
     check('avg_rate')
        .exists()
        .withMessage('Enter Average Rate')
        .optional({nullable:true})
        .isLength({ min: 1 }),
     check('adv_cost')
        .exists()
        .optional({nullable:true}),
        check('coa')
        .exists()
        .withMessage('COA is required')
        
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
        .exists()
        .withMessage('Must be only alphabetical chars'),
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
        .withMessage('Select Quantity'),
    check('avg_rate')
        .exists()
        .optional({nullable:true})
        .isAlphanumeric(),
     check('adv_cost')
         .exists()
         .optional({nullable:true}),
        
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['id','code','scode','title','uom','qty','avg_rate','adv_cost','coa','remarks','active'];
            console.log(value);
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
