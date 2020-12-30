const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const notesController =  require('../controllers/notes.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');



const { createNotesSchema, updateNotesSchema} = require('../middleware/validators/notesValidator.middleware');


router.get('/',auth(), awaitHandlerFactory(notesController.getAllNotes)); //localhost:3000/api/v1/notes
router.get('/list',auth(), awaitHandlerFactory(notesController.ListAllNotes)); //localhost:3000/api/v1/notes
router.get('/:id', auth(),awaitHandlerFactory(notesController.getNotesById)); //localhost:3000/api/v1/notes/id/1
router.get('/code/:code', auth(),awaitHandlerFactory(notesController.getNotesBycode)); //localhost:3000/api/v1/notes/notescode/julia
router.post('/', auth(),createNotesSchema, awaitHandlerFactory(notesController.createNotes));  // localhost:3000/api/v1/notes
router.put('/:id',auth(),updateNotesSchema, awaitHandlerFactory(notesController.updateNotes)); //localhost:3000/api/v1/notes/id/1 , using patch for partial update
router.delete('/:id', auth(Role.Admin), awaitHandlerFactory(notesController .deleteNotes)); //localhost:3000/api/v1/notes/id/1

module.exports = router;
