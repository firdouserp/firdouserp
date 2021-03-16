const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createClientsSchema = [
    check('name')
        .exists()
        .isAlphanumeric()
        .withMessage('code is required')
        .isLength({min: 1})
        .withMessage('Must be at least 3 chars long'),
    check('father_name')
        .exists()
        .optional({nullable:true})
        .withMessage('Must be at least 3 chars long'),
    check('postal_address')
        .exists()
        .optional({nullable:true})
        .withMessage('title must be required'),
    check('residential_address')
        .exists()
        .optional({nullable:true}),
    check('phone_office')
        .exists()
        .optional({nullable:true})
        .withMessage('remarks must be required'),
    check('phone_residential')
        .exists()
        .optional({nullable:true}),
     check('phone_mobile')
        .exists()
        .withMessage('Enter Average Rate')
        .optional({nullable:true})
        .isLength({ min: 1 }),
     check('occupation')
        .exists()
        .optional({nullable:true}),
        check('age')
        .exists()
        .withMessage('AGE is required'),
        check('nationality')
        .exists()
        .withMessage('Enter Average Rate')
        .optional({nullable:true})
        .isLength({ min: 1 }),
        check('reference_of')
        .exists()
        .withMessage('Enter Average Rate')
        .optional({nullable:true})
        .isLength({ min: 1 }),
        check('nominee_name')
        .exists()
        .withMessage('Enter Average Rate')
        .optional({nullable:true})
        .isLength({ min: 1 }),
        check('nominee_relation')
        .exists()
        .withMessage('Enter Average Rate')
        .optional({nullable:true})
        .isLength({ min: 1 }),
        check('nominee_address')
        .exists()
        .withMessage('Enter Average Rate')
        .optional({nullable:true})
        .isLength({ min: 1 }),
        check('email')
        .exists()
        .withMessage('Enter Average Rate')
        .optional({nullable:true})
        .isLength({ min: 1 })
        
];

exports.updateClientsSchema = [
    check('name')
    .exists()
    .isAlphanumeric()
    .withMessage('code is required')
    .isLength({min: 1})
    .withMessage('Must be at least 3 chars long'),
check('father_name')
    .exists()
    .optional({nullable:true})
    .withMessage('Must be at least 3 chars long'),
check('postal_address')
    .exists()
    .optional({nullable:true})
    .withMessage('title must be required'),
check('residential_address')
    .exists()
    .optional({nullable:true}),
check('phone_office')
    .exists()
    .optional({nullable:true})
    .withMessage('remarks must be required'),
check('phone_residential')
    .exists()
    .optional({nullable:true}),
 check('phone_mobile')
    .exists()
    .withMessage('Enter Average Rate')
    .optional({nullable:true})
    .isLength({ min: 1 }),
 check('occupation')
    .exists()
    .optional({nullable:true}),
    check('age')
    .exists()
    .withMessage('AGE is required'),
    check('nationality')
    .exists()
    .withMessage('Enter Average Rate')
    .optional({nullable:true})
    .isLength({ min: 1 }),
    check('reference_of')
    .exists()
    .withMessage('Enter Average Rate')
    .optional({nullable:true})
    .isLength({ min: 1 }),
    check('nominee_name')
    .exists()
    .withMessage('Enter Average Rate')
    .optional({nullable:true})
    .isLength({ min: 1 }),
    check('nominee_relation')
    .exists()
    .withMessage('Enter Average Rate')
    .optional({nullable:true})
    .isLength({ min: 1 }),
    check('nominee_address')
    .exists()
    .withMessage('Enter Average Rate')
    .optional({nullable:true})
    .isLength({ min: 1 }),
    check('email')
    .exists()
    .withMessage('Enter Average Rate')
    .optional({nullable:true})
    .isLength({ min: 1 }),
        
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['name','father_name','postal_address','residential_address','phone_office','phone_residential','phone_mobile','occupation','age','nationality','reference_of','nominee_name','nominee_relation','nominee_address','email'];
            console.log(value);
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
