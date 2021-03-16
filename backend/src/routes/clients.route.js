const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const clientsController =  require('../controllers/clients.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');



const { createClientsSchema, updateClientsSchema} = require('../middleware/validators/clientsValidator.middleware');


router.get('/',auth(), awaitHandlerFactory(clientsController.getAllClients)); //localhost:3000/api/v1/clients
router.get('/:id', auth(),awaitHandlerFactory(clientsController.getClientsById)); //localhost:3000/api/v1/units/id/1
router.get('/code/:code', auth(),awaitHandlerFactory(clientsController.getClientsBycode)); //localhost:3000/api/v1/stock/stockcode/julia
router.post('/', auth(),createClientsSchema, awaitHandlerFactory(clientsController.createClients));  // localhost:3000/api/v1/stock
router.put('/:id',auth(),updateClientsSchema, awaitHandlerFactory(clientsController.updateClients)); //localhost:3000/api/v1/stock/id/1 , using patch for partial update
router.delete('/:id', auth(Role.Admin), awaitHandlerFactory(clientsController .deleteClients)); //localhost:3000/api/v1/stock/id/1

module.exports = router;
