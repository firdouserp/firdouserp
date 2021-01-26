const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createSettingSchema = [
    check('org_name')
        .exists()
        .isAlphanumeric()
        .withMessage('code is required'),
    check('org_address')
        .exists()
        .withMessage('Your title is required'),
    check('company_logo')
        .exists()
        .withMessage('Your title is required'),
    check('grn_account')
        .exists()
        .withMessage('Your title is required')
];

exports.updateSettingSchema = [
    check('org_name')
    .exists()
    .isAlphanumeric()
    .withMessage('code is required'),
check('org_address')
    .exists()
    .withMessage('Your title is required'),
check('company_logo')
    .exists()
    .withMessage('Your title is required'),
check('grn_account')
    .exists()
    .withMessage('Your title is required'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['id','org_name', 'org_address','company_logo','grn_account'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
