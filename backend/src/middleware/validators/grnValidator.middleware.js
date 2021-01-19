const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createGrnSchema = [
    check('grn_no')
        .exists()
        .withMessage('Grn No is required'),
    check('grn_date')
        .exists()
        .withMessage('Date is required'),
    check('po_id')
        .exists()
        .withMessage('po_id must be required'),
    check('created_on')
        .exists()
        .withMessage('creation date must be required'),
    check('created_by')
        .exists()
        .withMessage('creation by must be required'), 
    check('status')
        .exists()
        .withMessage('status are required'),
     check('remarks')
        .exists()
        .withMessage('obal is required'),
     check('ref_no')
        .exists()
        .withMessage('State required'),
    
];

exports.updateGrnSchema = [
    check('grn_no')
    .exists()
    .withMessage('Grn No is required'),
check('grn_date')
    .exists()
    .withMessage('Date is required'),
check('po_id')
    .exists()
    .withMessage('po_id must be required'),
check('created_on')
    .exists()
    .withMessage('creation date must be required'),
    check('created_by')
    .exists()
        .withMessage('creation date must be required'),
check('status')
    .exists()
    .withMessage('status are required'),
 check('remarks')
    .exists()
    .withMessage('obal is required'),
 check('ref_no')
    .exists()
    .withMessage('refno required'),
check('status')
.exists()
.withMessage('status required'),
    

    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['id','grn_no', 'grn_date', 'po_id', 'po_no', 'created_on','created_by', 'status', 'remarks','refno'];
            console.log(allowUpdates);
            return updates.every(update => allowUpdates.includes(update));
            
        })
        .withMessage('Invalid updates!')
];
