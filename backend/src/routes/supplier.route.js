const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createSupplierSchema, updateSupplierSchema} = require('../middleware/validators/supplierValidator.middleware');


router.get('/', awaitHandlerFactory(supplierController.getAllsupplier)); // localhost:3000/api/v1/supplier
router.get('/id/:id', awaitHandlerFactory(supplierController.getsupplierById)); // localhost:3000/api/v1/supplier/id/1
router.get('/username/:username', awaitHandlerFactory(supplierController.getSupplierBycode)); // localhost:3000/api/v1/supplier/suppliercode/julia
router.post('/', createSupplierSchema, awaitHandlerFactory(supplierController.createSupplier)); // localhost:3000/api/v1/supplier
router.patch('/id/:id', updateSupplierSchema, awaitHandlerFactory(supplierController.updateSupplier)); // localhost:3000/api/v1/supplier/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(supplierController.deleteSupplier)); // localhost:3000/api/v1/supplier/id/1


module.exports = router;
