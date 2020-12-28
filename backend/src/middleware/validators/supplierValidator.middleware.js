const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createSupplierSchema = [
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
    check('person')
        .exists()
        .withMessage('person must be required')
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('contact')
        .exists()
        .isAlphanumeric()
        .withMessage('Contact is required'),
    check('address')
        .exists()
        .withMessage('Address must be required'),
    check('city')
        .exists()
        .withMessage('Your city')
        .optional()
        .isLength({ min: 3 }),

     check('country')
        .exists()
        .withMessage('Your Country')
        .optional()
        .isLength({ min: 2 }),
    check('email')
        .exists()
        .withMessage('Your Email is not valid'),
    check('fax')
        .optional({nullable:true})
        .isLength({ min: 2 })
        .withMessage('Your Fax is not valid'),
    check('ntn')
        .optional({nullable:true}),
        
    check('cnic')
        .exists()
        .isAlphanumeric()
        .isLength({min: 12})
        .withMessage('CNIC should be valid'),
    check('businesstitle')
        .exists()
        .withMessage('Business Tittle is required'),

        
];

exports.updateSupplierSchema = [
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
    check('person')
        .optional()
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('contact')
        .optional()
        .isNumeric()
        .withMessage('Must be a valid contact'),
    check('address')
        .optional(),
    check('city')
        .optional()
        .isLength({ min: 3})
        .withMessage('Select City')
        .isLength({ max: 10 })
        .withMessage('City can contain max 10 characters'),
    check('country')
    .exists()
        .optional()
        .withMessage('Select Country'),
    check('businesstitle')
    .exists()
        .optional()
        .withMessage('Must be a business title'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['id','code','scode','title','person','contact','address','city','country','email','fax','ntn','stn','cnic','businesstitle','nature','active'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
