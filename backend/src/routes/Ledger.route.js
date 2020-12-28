const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const ledgerController =  require('../controllers/ledger.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');



const { createLedgerSchema, updateLedgerSchema} = require('../middleware/validators/ledgerValidator.middleware');


router.get('/',auth(), awaitHandlerFactory(ledgerController.getAllLedger)); //localhost:3000/api/v1/ledger
router.get('/:id', auth(),awaitHandlerFactory(ledgerController.getsledgerById)); //localhost:3000/api/v1/ledger/id/1
router.get('/code/:code', auth(),awaitHandlerFactory(ledgerController.getLedgerBycode)); //localhost:3000/api/v1/ledge/ledgercode/julia
router.post('/', auth(),createLedgerSchema, awaitHandlerFactory(ledgerController.createLedger));  // localhost:3000/api/v1/ledger
router.patch('/:id',auth(),updateLedgerSchema, awaitHandlerFactory(ledgerController.updateLedger)); //localhost:3000/api/v1/ledger/id/1 , using patch for partial update
router.delete('/:id', auth(Role.Admin), awaitHandlerFactory(ledgerController.deleteLedger)); //localhost:3000/api/v1/ledger/id/1


module.exports = router;
