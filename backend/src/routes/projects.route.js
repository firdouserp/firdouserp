const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const projectsController =  require('../controllers/projects.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');



const { createProjectsSchema,updateProjectsSchema} = require('../middleware/validators/projectsValidator.middleware');


router.get('/',auth(), awaitHandlerFactory(projectsController.getAllProjects)); //localhost:3000/api/v1/projects
router.get('/id/:id', auth(),awaitHandlerFactory(projectsController.getrojectsById)); //localhost:3000/api/v1/projects/id/1
router.get('/username/:username', auth(),awaitHandlerFactory(projectsController.getProjectsBycode)); //localhost:3000/api/v1/projects/projectscode/julia
router.post('/', auth(),createProjectsSchema, awaitHandlerFactory(projectsController.createProjects));  // localhost:3000/api/v1/projects
router.patch('/id/:id',auth(),updateProjectsSchema, awaitHandlerFactory(projectsController.updateProjects)); //localhost:3000/api/v1/projects/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(projectsController.deleteProjects)); //localhost:3000/api/v1/projects/id/1


module.exports = router;
