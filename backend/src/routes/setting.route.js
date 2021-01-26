const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const settingController =  require('../controllers/setting.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');



const { createSettingSchema,updateSettingSchema} = require('../middleware/validators/settingValidator.middleware');


router.get('/',auth(), awaitHandlerFactory(settingController.getAllSetting)); //localhost:3000/api/v1/setting
router.get('/:id', auth(),awaitHandlerFactory(settingController.getSettingById)); //localhost:3000/api/v1/setting/id/1
router.get('/code/:code', auth(),awaitHandlerFactory(settingController.getSettingBycode)); //localhost:3000/api/v1/coa_type/setting/julia
router.post('/', auth(),createSettingSchema, awaitHandlerFactory(settingController.createSetting));  // localhost:3000/api/v1/setting
router.put('/:id',auth(),updateSettingSchema, awaitHandlerFactory(settingController.updateSetting)); //localhost:3000/api/v1/setting/id/1 , using patch for partial update
router.delete('/:id', auth(Role.Admin), awaitHandlerFactory(settingController.deleteSetting)); //localhost:3000/api/v1/setting/id/1


module.exports = router;
