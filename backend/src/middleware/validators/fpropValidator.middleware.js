const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createFpropSchema = [
    check('type')
        .exists()
        .withMessage('type is required'),
      
    
    check('value')
        .exists()
        .withMessage('Your value is required')
      
        
];

exports.updateFpropSchema = [
check('type')
    .exists()
    .withMessage('code is required'),
  

check('value')
    .exists()
    .withMessage('Your title is required'),
    
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['id','type', 'oid','value'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
