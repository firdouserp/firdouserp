const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createPurchase_orderSchema = [
    check('purchase_id')
        .exists()
        .withMessage("Required"),
    check('purchase_date')
        .exists()
        .withMessage("Required"),
    check('supplier_id')
        .exists()
        .withMessage('Required'),
    check('order_id')
        .exists()
        .withMessage('Required'),
    check('delivery_address')
        .exists()
        .withMessage('delivery address must be required'),
    check('created_on')
        .exists()
        .withMessage('Required'),
     check('created_by')
        .exists()
        .withMessage("Required"),
     check('status')
        .exists()
        .withMessage("Required"),
        
];

exports.updatePurchase_orderSchema = [
    check('purchase_id')
    .exists()
    .withMessage("Required"),
check('purchase_date')
    .exists()
    .withMessage("Required"),
check('supplier_id')
    .exists()
    .withMessage('Required'),
check('order_id')
    .exists()
    .withMessage('Required'),
check('delivery_address')
    .exists()
    .withMessage('delivery address must be required'),
check('created_on')
    .exists()
    .withMessage('Required'),
 check('created_by')
    .exists()
    .withMessage("Required"),
 check('status')
    .exists()
    .withMessage("Required"),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['purchase_id', 'purchase_date','supplier_id','order_id', 'delivery_address', 'created_on', 'created_by', 'status'];
            console.log(value);
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
