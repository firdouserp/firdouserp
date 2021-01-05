const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createEmployeesSchema = [
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
    check('designation')
        .exists()
        .isLength({min : 1})
        .withMessage('designation is required'),
    check('grade')
        .exists()
        .isLength({min : 1})
        .withMessage('grade must be required'),
    check('department')
        .exists()
        .withMessage('department is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('min 1 characters'),

     check('address')
        .exists()
        .withMessage('address is required')
        .optional()
        .isLength({ min: 1 }),
        check('city')
        .exists()
        .optional()
        .isLength({min : 1})
        .withMessage('City is required'),
        check('cnic')
        .exists()
        .optional()
        .isLength({min : 1})
        .withMessage('CNIC required'),
        check('remarks')
        .exists()
        .optional()
        .isLength({min : 1})
        .withMessage('Remarks required'),

        check('active')
        .exists()
        .optional()
        .isLength({min : 1})
        .withMessage('State required'),
        
];

exports.updateEmployeesSchema = [
    check('code')
        .exists()
        .withMessage('code is required')
        .isLength({min: 3})
        .withMessage('Must be at least 3 chars long')
        .optional(),
    check('scode')
        .exists()
        .withMessage('Your short code is required')
        .withMessage('Can be numerical and aplhanumerical')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long')
        .optional(),
    check('title')
        .exists()
        .withMessage('title must be required')
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long')
        .optional(),
    check('designation')
        .exists()
        .isLength({min : 1})
        .withMessage('designation is required')
        .optional(),
    check('grade')
        .exists()
        .isLength({min : 1})
        .withMessage('grade must be required')
        .optional(),
    check('department')
        .exists()
        .withMessage('department is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('min 1 characters'),

    check('address')
        .exists()
        .withMessage('address is required')
        .optional()
        .isLength({ min: 1 }),
    check('city')
        .exists()
        .optional()
        .isLength({min : 1})
        .withMessage('City is required'),
    check('cnic')
        .exists()
        .optional()
        .isLength({min : 1})
        .withMessage('CNIC required'),
    check('remarks')
        .exists()
        .optional()
        .isLength({min : 1})
        .withMessage('Remarks required'),

    check('active')
        .exists()
        .optional()
        .isLength({min : 1})
        .withMessage('State required'),
        
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['id','code','scode','title','designation','grade','department','address','city','cnic','remarks','active'];
            console.log(allowUpdates);
            return updates.every(update => allowUpdates.includes(update));
            
        })
        .withMessage('Invalid updates!')
];
