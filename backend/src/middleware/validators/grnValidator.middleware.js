const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createGrnSchema = [
    check('grn_date')
        .exists()
        .withMessage('Date is required'),
    check('po_id')
        .exists()
        .withMessage('po_id must be required'),
    check('grn_details')
        .exists()
        .withMessage('Items must be required'),

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

    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
];
