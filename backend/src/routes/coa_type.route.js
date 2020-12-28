const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const coa_typeController =  require('../controllers/coa_type.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');



const { createCoa_typeSchema,updateCoa_typeSchema} = require('../middleware/validators/coa_typeValidator.middleware');


router.get('/',auth(), awaitHandlerFactory(coa_typeController.getAllCoa_type)); //localhost:3000/api/v1/coa_type
router.get('/:id', auth(),awaitHandlerFactory(coa_typeController.getCoa_typeById)); //localhost:3000/api/v1/coa_type/id/1
router.get('/code/:code', auth(),awaitHandlerFactory(coa_typeController.getCoa_typeBycode)); //localhost:3000/api/v1/coa_type/coacode/julia
router.post('/', auth(),createCoa_typeSchema, awaitHandlerFactory(coa_typeController.createCoa_type));  // localhost:3000/api/v1/coa_type
router.put('/:id',auth(),updateCoa_typeSchema, awaitHandlerFactory(coa_typeController.updateCoa_type)); //localhost:3000/api/v1/coa_type/id/1 , using patch for partial update
router.delete('/:id', auth(Role.Admin), awaitHandlerFactory(coa_typeController.deleteCoa_type)); //localhost:3000/api/v1/coa_type/id/1


module.exports = router;
