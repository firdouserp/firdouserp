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
       .optional({nullable:true})
        .withMessage('grade must be required'),
    check('department')
        .exists()
        .withMessage('department is required')
        .optional({nullable:true}),
     check('address')
        .exists()
        .withMessage('address is required')
        .optional({nullable:true}),
        check('city')
        .exists()
        .optional({nullable:true}),
        check('cnic')
        .exists()
        .optional({nullable:true})
        .withMessage('CNIC required'),
        check('coa')
        .exists()
        .optional({nullable:true})
        .withMessage('COA required'),
        check('remarks')
        .exists()
        .optional({nullable:true})
        
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
        .optional({nullable:true})
        .isAlphanumeric()
        .withMessage('code is required')
        .isLength({min: 3})
        .withMessage('Must be at least 3 chars long'),
    check('scode')
        .exists()
        .optional({nullable:true})
        .isAlphanumeric()
        .withMessage('Your short code is required')
        .withMessage('Can be numerical and aplhanumerical')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('title')
        .exists()
        .optional({nullable:true})
        .withMessage('title must be required')
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('designation')
        .exists()
        .optional({nullable:true})
        .isLength({min : 1})
        .withMessage('designation is required'),
    check('grade')
        .exists()
       .optional({nullable:true})
        .withMessage('grade must be required'),
    check('department')
        .exists()
        .withMessage('department is required')
        .optional({nullable:true}),
     check('address')
        .exists()
        .withMessage('address is required')
        .optional({nullable:true}),
        check('city')
        .exists()
        .optional({nullable:true}),
        check('cnic')
        .exists()
        .optional({nullable:true})
        .withMessage('CNIC required'),
        check('coa')
        .exists()
        .optional({nullable:true})
        .withMessage('COA required'),
        check('remarks')
        .exists()
        .optional({nullable:true})
        .withMessage('Remarks required'),

        check('active')
        .exists()
        .optional({nullable:true})
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
