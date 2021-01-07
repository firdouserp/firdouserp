const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const scheduleController =  require('../controllers/schedule.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');



const { createScheduleSchema, updateScheduleSchema} = require('../middleware/validators/scheduleValidator.middleware');


router.get('/',auth(), awaitHandlerFactory(scheduleController.getAllSchedule)); //localhost:3000/api/v1/schedule
router.get('/:id', auth(),awaitHandlerFactory(scheduleController.getScheduleById)); //localhost:3000/api/v1/schedule/id/1
router.get('/code/:code', auth(),awaitHandlerFactory(scheduleController.getScheduleBycode)); //localhost:3000/api/v1/schedule/schedulecode/julia
router.post('/', auth(),createScheduleSchema, awaitHandlerFactory(scheduleController.createSchedule));  // localhost:3000/api/v1/schedule
router.put('/:id',auth(),updateScheduleSchema, awaitHandlerFactory(scheduleController.updateSchedule)); //localhost:3000/api/v1/schedule/id/1 , using patch for partial update
router.delete('/:id', auth(Role.Admin), awaitHandlerFactory(scheduleController.deleteSchedule)); //localhost:3000/api/v1/schedule/id/1


module.exports = router;
