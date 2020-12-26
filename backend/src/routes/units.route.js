const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const unitsController =  require('../controllers/units.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');



const { createUnitsSchema, updateUnitsSchema} = require('../middleware/validators/unitsValidator.middleware');


router.get('/',auth(), awaitHandlerFactory(unitsController.getAllUnits)); //localhost:3000/api/v1/units
router.get('/id/:id', auth(),awaitHandlerFactory(unitsController.getunitsById)); //localhost:3000/api/v1/units/id/1
router.get('/username/:username', auth(),awaitHandlerFactory(unitsController.getUnitsBycode)); //localhost:3000/api/v1/suppliers/unitscode/julia
router.post('/', auth(),createUnitsSchema, awaitHandlerFactory(unitsController.createUnits));  // localhost:3000/api/v1/units
router.patch('/id/:id',auth(),updateUnitsSchema, awaitHandlerFactory(unitsController.updateUnit)); //localhost:3000/api/v1/units/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(unitsController.deleteUnits)); //localhost:3000/api/v1/units/id/1


module.exports = router;
