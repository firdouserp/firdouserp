const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createVouchersSchema = [
    check('voucher_date')
        .exists()
        .withMessage("enter in a date format (YYYY/MM/DD"),
    check('voucher_no')
        .exists()
        .withMessage('Your voucher number is required')
        .isLength({ min: 1})
        .withMessage("Enter minimum 1 character"),
    check('voucher_type')
        .exists()
        .isAlphanumeric()
        .withMessage('voucher type must be required')
        .isLength({ min: 1 })
        .withMessage("Enter minimum 1 character"),
    check('amount')
        .exists()
        .withMessage('Amount is required'),
    check('approved')
        .exists()
        .withMessage("Enter the approved"),
    check('remarks')
        .exists()
        .withMessage("Enter remarks")
        .isLength({min : 1})
        .withMessage("Enter minimum 1 character"),
    check('prepared_by')
        .exists()
        .withMessage('enter the name'),
    check('project_id')
        .exists()
        .withMessage("Enter the project ID"),
    check('created_by')
        .exists()
        .withMessage('created by required'),
    check('chq_no')
        .exists()
        .withMessage("Enter the cheque number"),
    check('chq_date')
        .exists()
        .withMessage("Enter in the date format "),
    
];

exports.updateVouchersSchema = [
    check('voucher_date')
    .exists()
    .optional({nullable:true})
    .withMessage("enter in a date format (YYYY/MM/DD"),
check('voucher_no')
    .exists()
    .withMessage('Your voucher number is required')
    .isLength({ min: 1})
    .optional({nullable:true})
    .withMessage("Enter minimum 1 character"),
check('voucher_type')
    .exists()
    .isAlphanumeric()
    .withMessage('voucher type must be required')
    .isLength({ min: 1 })
    .withMessage("Enter minimum 1 character")
    .optional({nullable:true}),
check('amount')
    .exists()
    .withMessage('Amount is required')
    .optional({nullable:true}),
check('approved')
    .exists()
    .withMessage("Enter the approved")
    .optional({nullable:true}),
check('remarks')
    .exists()
    .withMessage("Enter remarks")
    .isLength({min : 1})
    .withMessage("Enter minimum 1 character")
    .optional({nullable:true}),
check('prepared_by')
    .exists()
    .withMessage('enter the name')
    .optional({nullable:true}),
check('project_id')
    .exists()
    .withMessage("Enter the project ID")
    .optional({nullable:true}),
check('created_by')
    .exists()
    .withMessage('created by required')
    .optional({nullable:true}),
check('chq_no')
    .exists()
    .withMessage("Enter the cheque number")
    .optional({nullable:true}),
check('chq_date')
    .exists()
    .withMessage("Enter in the date format ")
    .optional({nullable:true}),
       
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['id','voucher_date','voucher_no','voucher_type','amount','approved','remarks','prepared_by','project_id','created_by','chq_no','chq_date'];
            console.log(value);
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
