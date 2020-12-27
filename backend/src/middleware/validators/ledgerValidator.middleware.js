const { body, check } = require('express-validator');
const { NEWDATE } = require('mysql2/lib/constants/types');
const Role = require('../../utils/userRoles.utils');


exports.createLedgerSchema = [
    check('vou_no')
        .exists()
        .withMessage('code is required')
        .isLength({min: 1})
        .withMessage('Must be at least 3 chars long'),
    check('vou_date')
        .exists()
        .withMessage('Your voucher date is required and must be in Date format'),
    check('vou_type')
        .exists()
        .withMessage('voucher type must be required')
        .isAlphanumeric()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 1 })
        .withMessage('Must be at least 3 chars long'),
    check('srno')
        .exists()
        .isNumeric()
        .withMessage('smo is required'),
    check('supplier')
        .exists()
        .withMessage('Supplier must be required'),
    check('project')
        .exists()
        .withMessage('Project required')
        .isLength({ min: 1}),
     check('stock')
        .exists()
        .withMessage('Stock required')
        .optional()
        .isLength({ min: 1 }),
    check('unit')
        .exists()
        .isAlphanumeric()
        .withMessage('unit is required'),
    check('employee')
        .exists()
        .withMessage('employee required')
        .isLength({ min: 1 }),
    check('refno')
        .exists()
        .isAlphanumeric()
        .optional({nullable:true}),
        
    check('chq_no')
        .exists()
        .isAlphanumeric()
        .isLength({min: 1})
        .withMessage('cheque should be valid'),
    check('chq_date')
        .exists()
        .withMessage('Cheque date is required and must be in Date'),
    check('dr')
        .exists()
        .isLength({min: 1})
        .withMessage('dr should be valid'),
    check('cr')
        .exists()
        .isLength({min: 1})
        .withMessage('cr should be valid'),
    check('description')
        .exists()
        .isLength({min: 1})
        .withMessage('description should be valid'),
    check('remarks')
        .exists()
        .isLength({min: 1})
        .optional({nullable:true})
        .withMessage('remarks required'),
    
    
    
    

        
];

exports.updateLedgerSchema = [
    check('vou_no')
    .exists()
    .isAlphanumeric()
    .withMessage('code is required')
    .isLength({min: 3})
    .withMessage('Must be at least 3 chars long'),
check('vou_date')
    .exists()
    .isDate()
    .withMessage('Your voucher date is required')
    .withMessage('Can be numerical and aplhanumerical')
    .isLength({ min: 3 })
    .withMessage('Must be at least 3 chars long'),
check('vou_type')
    .exists() 
    .withMessage('voucher type must be required')
    .isAlphanumeric()
    .withMessage('Must be only alphabetical chars')
    .isLength({ min: 3 })
    .withMessage('Must be at least 3 chars long'),
check('smo')
    .exists()
    .isAlphanumeric()
    .withMessage('smo is required'),
check('supplier')
    .exists()
    .withMessage('Supplier must be required'),
check('project')
    .exists()
    .withMessage('Project required')
    .optional()
    .isLength({ min: 3 }),

 check('stock')
    .exists()
    .withMessage('Stock required')
    .optional()
    .isLength({ min: 2 }),
check('unit')
    .exists()
    .withMessage('unit is required'),
check('employee')
    .exists()
    .withMessage('employee required')
    .optional()
    .isLength({ min: 2 }),
    check('refno')
    .optional({nullable:true}),
    
check('chq_no')
    .exists()
    .isAlphanumeric()
    .isLength({min: 12})
    .withMessage('cheque should be valid'),
    check('chq_date')
    .exists()
    .isISO31661Alpha2()
    .withMessage('Cheque date is required'),
    check('dr')
    .exists()
    .isLength({min: 1})
    .withMessage('dr should be valid'),
    check('cr')
    .exists()
    .isLength({min: 1})
    .withMessage('cr should be valid'),
    check('description')
    .exists()
    .isAlphanumeric()
    .isLength({min: 4})
    .withMessage('description should be valid'),
    check('remarks')
    .exists()
    .isAlphanumeric()
    .isLength({min: 4})
    .withMessage('remarks required'),


    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['vou_no','vou_date','vou_type','srno,coa','supplier','project','stock','unit','employee','refno','chq_no','chq_date','dr','cr','description','remarks'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
