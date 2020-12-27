const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const supplierController =  require('../controllers/supplier.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');



const { createSupplierSchema, updateSupplierSchema} = require('../middleware/validators/supplierValidator.middleware');


router.get('/',auth(), awaitHandlerFactory(supplierController.getAllSuppliers)); //localhost:3000/api/v1/suppliers
router.get('/:id', auth(),awaitHandlerFactory(supplierController.getSupplierById)); //localhost:3000/api/v1/suppliers/id/1
router.get('/code/:code', auth(),awaitHandlerFactory(supplierController.getSupplierBycode)); //localhost:3000/api/v1/suppliers/suppliercode/julia
router.post('/', auth(),createSupplierSchema, awaitHandlerFactory(supplierController.createSupplier));  // localhost:3000/api/v1/suppliers
router.put('/:id',auth(),updateSupplierSchema, awaitHandlerFactory(supplierController.updateSupplier)); //localhost:3000/api/v1/suppliers/id/1 , using patch for partial update
router.delete('/:id', auth(Role.Admin), awaitHandlerFactory(supplierController.deleteSupplier)); //localhost:3000/api/v1/suppliers/id/1


module.exports = router;
