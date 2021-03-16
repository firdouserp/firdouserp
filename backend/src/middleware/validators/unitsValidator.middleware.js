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
    check('project')
        .exists()
        .optional()
        .withMessage('Must be a valid project'),
    check('title')
        .exists()
        .withMessage('title must be required')
        .isLength({ min: 3 }),
    check('utype')
        .exists()
        .withMessage('Unit type is required'),
        check('coa')
        .exists()
        .optional({nullable:true})
        .withMessage('Unit type is required'),
    check('ulocation')
        .exists()
        .withMessage('Unit location must be required'),
    check('usize')
        .exists()
        .optional({nullable:true}),
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
    .optional({nullable:true})
    .isAlphanumeric(),
    check('scode')
        .exists()
        .optional({nullable:true})
        .isAlphanumeric()
        .withMessage('Must be at least 3 chars long'),
    check('project')
        .exists()
        .optional({nullable:true})
        .withMessage('Must be a valid project'),
    check('title')
        .exists()
        .optional({nullable:true})
        .withMessage('Must be only alphabetical chars'),
    check('ulocation')
        .exists()
        .optional({nullable:true})
        .withMessage('Must be a valid location'),
    check('utype')
        .exists()
        .optional({nullable:true}),
    check('usize')
        .exists()
        .optional({nullable:true})
        .withMessage('City can contain max 10 characters'),
        check('coa')
        .exists()
        .optional({nullable:true})
        .withMessage('Unit type is required'),
    check('remarks')
        .exists()
        .optional({nullable:true})
        .withMessage('Any remarks'),
    check('active')
        .exists()
        .optional({nullable:true})
        .withMessage('Define state'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['id','code','scode','project','title','utype','ulocation','usize','coa','remarks','active'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
