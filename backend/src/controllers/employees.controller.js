const EmployeesModel = require("../models/employees.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Employees Controller
 ******************************************************************************/
class EmployeesController {
  getAllEmployees = async (req, res, next) => {
    let employeesList;
    var range;
    var sort;
    var filter;

    if (req.query && Object.keys(req.query).length) {
      var range = JSON.parse(req.query.range);
      var sort = JSON.parse(req.query.sort);
      var filter = JSON.parse(req.query.filter);
      //console.log(range)
      employeesList = await EmployeesModel.find(filter, range, sort);
    } else {
      employeesList = await EmployeesModel.find();
    }

    let count = await EmployeesModel.count(filter);
    if (range && range.length > 1) {
      let content_range = range[0] + "-" + range[1] + "/" + count;
      console.log(content_range);
      res.set("Content-Range", content_range);
    }

    res.send(employeesList);
  };

  getEmployeesById = async (req, res, next) => {
    const employees = await EmployeesModel.findOne({ id: req.params.id });
    if (!employees) {
      throw new HttpException(404, "Employees not found");
    }

    res.send(employees);
  };

  getEmployeesByemployeesName = async (req, res, next) => {
    const employees = await EmployeesModel.findOne({ employeesname: req.params.employeesname });
    if (!employees) {
      throw new HttpException(404, "Employees not found");
    }
  };

  createEmployees = async (req, res, next) => {
    this.checkValidation(req);

    const result = await EmployeesModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    const employees = await EmployeesModel.findOne({ id: result });
    if (!employees) {
      throw new HttpException(404, "Employee not found");
    }

    res.status(201).send(employees);
  };

  updateEmployees = async (req, res, next) => {
    this.checkValidation(req);

    // do the update query and get the result
    // it can be partial edit
    const { ...restOfUpdates } = req.body;
    const result = await EmployeesModel.update(restOfUpdates, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "Employees not found"
      : affectedRows && changedRows
      ? "Employees updated successfully"
      : "Updated faild";

    const employees = await EmployeesModel.findOne({ id: req.params.id });
    if (!employees) {
      throw new HttpException(404, "Employees not found");
    }

    res.status(201).send(employees);
  };

  deleteEmployees = async (req, res, next) => {
    const result = await EmployeesModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, "Employees not found");
    }
    res.send("Employees has been deleted");
  };

  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation faild", errors);
    }
  };

  autocomplete = async (req, res, next) => {
    //http://localhost:2000/api/v1/employees?filter={"q":"f"}&range=[0,24]&sort=["id","DESC"]
    let employeesList;
    var sort;
    var filter;

    if (req.query && Object.keys(req.query).length) {
      var sort = JSON.parse(req.query.sort);
      var filter = JSON.parse(req.query.filter);
      console.log(filter + "   " + sort);
      employeesList = await EmployeesModel.autocomplete(filter, sort);
    } else {
      employeesList = await EmployeesModel.autocomplete();
    }

    let content_range = "1-" + employeesList.length + "/" + employeesList.length;
    res.set("Content-Range", content_range);
    res.send(employeesList);
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new EmployeesController();
