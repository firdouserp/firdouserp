const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createPurchase_orderSchema = [

    check('purchase_date')
        .exists()
        .withMessage("Required"),
    check('supplier_id')
        .exists()
        .withMessage('Required'),
    check('delivery_address')
        .exists()
        .withMessage('delivery address must be required'),
    check('status')
        .exists()
        .withMessage("Status is Required"),

];

exports.updatePurchase_orderSchema = [
    check('id')
        .exists()
        .withMessage("Id is Required"),
    check('purchase_date')
        .exists()
        .withMessage("Required"),
    check('supplier_id')
        .exists()
        .withMessage('Required'),
    check('project_id')
        .exists()
        .withMessage('Required'),
    check('purchase_details')
        .exists()
        .isArray()
        .not().isEmpty()
        .withMessage('Items of Purchase Details'),

    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')

];
