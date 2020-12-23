const ProjectsModel = require('../models/projects.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Project Controller
 ******************************************************************************/
class ProjectsController {
    getAllProjects = async (req, res, next) => {
        let projectsList = await ProjectsModel.find();
        if (!projectsList.length) {
            throw new HttpException(404, 'Project not found');
        }

        

        res.send(projectsList);
    };

    getProjectsById = async (req, res, next) => {
        const projects = await ProjectsModel.findOne({ id: req.params.id });
        if (!projects) {
            throw new HttpException(404, 'Project not found');
        }

        
    };

    getProjectsByprojectsName = async (req, res, next) => {
        const projects = await ProjectsModel.findOne({ projectsname: req.params.projectsname });
        if (!projects) {
            throw new HttpException(404, 'Project not found');
        }

        };
    
    createProjects = async (req, res, next) => {
        this.checkValidation(req);
        
         const result = await ProjectsModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Project was created!');
    };

    updateProjects = async (req, res, next) => {
        this.checkValidation(req);

                
        // do the update query and get the result
        // it can be partial edit
        const result = await ProjectsModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Project not found' :
            affectedRows && changedRows ? 'Project updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteProjects = async (req, res, next) => {
        const result = await ProjectsModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Project not found');
        }
        res.send('Project has been deleted');
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ProjectsController;