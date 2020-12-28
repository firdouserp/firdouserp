const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const stockController =  require('../controllers/stock.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');



const { createStockSchema, updateStockSchema} = require('../middleware/validators/stockValidator.middleware');


router.get('/',auth(), awaitHandlerFactory(stockController.getAllStock)); //localhost:3000/api/v1/stock
router.get('/:id', auth(),awaitHandlerFactory(stockController.getStockById)); //localhost:3000/api/v1/units/id/1
router.get('/code/:code', auth(),awaitHandlerFactory(stockController.getStockBycode)); //localhost:3000/api/v1/stock/stockcode/julia
router.post('/', auth(),createStockSchema, awaitHandlerFactory(stockController.createStock));  // localhost:3000/api/v1/stock
router.put('/:id',auth(),updateStockSchema, awaitHandlerFactory(stockController.updateStock)); //localhost:3000/api/v1/stock/id/1 , using patch for partial update
router.delete('/:id', auth(Role.Admin), awaitHandlerFactory(stockController .deleteStock)); //localhost:3000/api/v1/stock/id/1

module.exports = router;
