const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createBookingSchema = [
    check('code')
        .exists()
        .withMessage('code is required')
        .isLength({min: 1})
        .withMessage('Must be at least 1 chars long'),
    check('scode')
        .exists()
        .withMessage('Your short code is required')
        .isLength({ min: 1 })
        .withMessage('Must be at least 3 chars long'),
    check('title')
        .exists()
        .withMessage('title must be required')
        .isLength({min : 1})
        .withMessage('Must be at least 3 chars long'),
    check('unit')
        .exists()
        .withMessage('unit  is required')
        .isLength({min : 1})
        .withMessage('unit must be 1 character long'),
    check('client')
        .exists()
        .isLength({min : 1})
        .withMessage('client must be required'),
    check('project')
        .exists()
        .withMessage('projects are required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('project must be 1 character long'),

     check('book_date')
        .exists()
        .withMessage('booking date is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('booking date must be 1 character long'),
     
        check('sale_price')
        .exists()
        .withMessage('sale price is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('sale price must be 1 character long'),

        check('discount')
        .exists()
        .withMessage('discount is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('discount must be 1 character long'),

        check('remarks')
        .exists()
        .withMessage('remarks is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('remarks must be 1 character long'),
        
        check('remarks')
        .exists()
        .withMessage('remarks is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('remarks must be 1 character long'),

        check('name')
        .exists()
        .withMessage('name is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('name must be 1 character long'),

        check('father_name')
        .exists()
        .withMessage('father name is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('father name must be 1 character long'),

        check('residential_address')
        .exists()
        .withMessage('residential address is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('residential address must be 1 character long'),

        check('phone_no')
        .exists()
        .withMessage('phone number is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('phone number must be 1 character long'),

        check('occupation')
        .exists()
        .withMessage('occupation is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('occupation must be 1 character long'),

        check('nationality')
        .exists()
        .withMessage('nationality is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('nationality must be 1 character long'),

        check('cnic')
        .exists()
        .withMessage('cnic is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('cnic must be 1 character long'),

        check('reference_off')
        .exists()
        .withMessage('reference is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('reference must be 1 character long'),

        check('nominee_name')
        .exists()
        .withMessage('nominee name is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('nominee must be 1 character long'),

        check('relation')
        .exists()
        .withMessage('relation is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('relation must be 1 character long'),

        check('email')
        .exists()
        .withMessage('email is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('email must be 1 character long'),

        check('active')
        .exists()
        .optional()
];

exports.updateBookingSchema = [
   check('code')
        .exists()
        .withMessage('code is required')
        .isLength({min: 1})
        .withMessage('Must be at least 1 chars long')
        .optional(),
    check('scode')
        .exists()
        .withMessage('Your short code is required')
        .isLength({ min: 1 })
        .withMessage('Must be at least 3 chars long')
        .optional(),
    check('title')
        .exists()
        .withMessage('title must be required')
        .isLength({min : 1})
        .withMessage('Must be at least 3 chars long')
        .optional(),
    check('unit')
        .exists()
        .withMessage('unit  is required')
        .isLength({min : 1})
        .withMessage('unit must be 1 character long')
        .optional(),
    check('client')
        .exists()
        .isLength({min : 1})
        .withMessage('client must be required')
        .optional(),
    check('project')
        .exists()
        .withMessage('projects are required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('project must be 1 character long'),

     check('book_date')
        .exists()
        .withMessage('booking date is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('booking date must be 1 character long'),
     
        check('sale_price')
        .exists()
        .withMessage('sale price is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('sale price must be 1 character long'),

        check('discount')
        .exists()
        .withMessage('discount is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('discount must be 1 character long'),

        check('remarks')
        .exists()
        .withMessage('remarks is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('remarks must be 1 character long'),
        
        check('remarks')
        .exists()
        .withMessage('remarks is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('remarks must be 1 character long'),

        check('name')
        .exists()
        .withMessage('name is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('name must be 1 character long'),

        check('father_name')
        .exists()
        .withMessage('father name is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('father name must be 1 character long'),

        check('residential_address')
        .exists()
        .withMessage('residential address is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('residential address must be 1 character long'),

        check('phone_no')
        .exists()
        .withMessage('phone number is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('phone number must be 1 character long'),

        check('occupation')
        .exists()
        .withMessage('occupation is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('occupation must be 1 character long'),

        check('nationality')
        .exists()
        .withMessage('nationality is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('nationality must be 1 character long'),

        check('cnic')
        .exists()
        .withMessage('cnic is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('cnic must be 1 character long'),

        check('reference_off')
        .exists()
        .withMessage('reference is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('reference must be 1 character long'),

        check('nominee_name')
        .exists()
        .withMessage('nominee name is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('nominee must be 1 character long'),

        check('relation')
        .exists()
        .withMessage('relation is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('relation must be 1 character long'),

        check('email')
        .exists()
        .withMessage('email is required')
        .optional()
        .isLength({ min: 1 })
        .withMessage('email must be 1 character long'),
        
        check('active')
        .exists()
        .optional(), 

    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['id','code','scode','title','unit','client','project','book_date','sale_price','discount','remarks','name','father_name','residential_address','phone_no','occupation','nationality','cnic','reference_off','nominee_name','relation','email','active'];
            console.log(allowUpdates);
            return updates.every(update => allowUpdates.includes(update));
            
        })
        .withMessage('Invalid updates!')
];
