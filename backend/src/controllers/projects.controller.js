const ProjectsModel = require("../models/projects.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Project Controller
 ******************************************************************************/
class ProjectsController {
  getAllProjects = async (req, res, next) => {
    let projectsList;
    var range;
    var sort;
    var filter;

    if (req.query && Object.keys(req.query).length) {
      var range = req.query.range && JSON.parse(req.query.range);
      var sort = req.query.sort && JSON.parse(req.query.sort);
      var filter = req.query.filter && JSON.parse(req.query.filter);
      projectsList = await ProjectsModel.find(filter, range, sort);
    } else {
      projectsList = await ProjectsModel.find();
    }

    let count = await ProjectsModel.count(filter);
    if (range && range.length > 1) {
      let content_range = range[0] + "-" + range[1] + "/" + count;
      console.log(content_range);
      res.set("Content-Range", content_range);
    }

    res.send(projectsList);
  };

  getProjectById = async (req, res, next) => {
    const projects = await ProjectsModel.findOne({ id: req.params.id });
    if (!projects) {
      throw new HttpException(404, "Project not found");
    }
    res.send(projects);
  };

  getProjectsByprojectsName = async (req, res, next) => {
    const projects = await ProjectsModel.findOne({
      projectsname: req.params.projectsname,
    });
    if (!projects) {
      throw new HttpException(404, "Project not found");
    }
  };

  createProjects = async (req, res, next) => {
    this.checkValidation(req);

    const result = await ProjectsModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    const projects = await ProjectsModel.findOne({ id: result });
    if (!projects) {
      throw new HttpException(404, "Project not found");
    }

    res.status(201).send(projects);
  };

  updateProjects = async (req, res, next) => {
    this.checkValidation(req);

    // do the update query and get the result
    // it can be partial edit
    const { ...restOfUpdates } = req.body;
    const result = await ProjectsModel.update(restOfUpdates, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "Project not found"
      : affectedRows && changedRows
      ? "Project updated successfully"
      : "Updated faild";
    const projects = await ProjectsModel.findOne({ id: req.params.id });
    if (!projects) {
      throw new HttpException(404, "Project not found");
    }

    res.status(201).send(projects);
  };

  deleteProjects = async (req, res, next) => {
    const result = await ProjectsModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, "Project not found");
    }
    res.send("Project has been deleted");
  };

  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation faild", errors);
    }
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ProjectsController();
