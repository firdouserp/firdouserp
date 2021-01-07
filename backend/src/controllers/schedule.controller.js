const ScheduleModel = require("../models/schedule.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Schedule Controller
 ******************************************************************************/
class ScheduleController {
  getAllSchedule = async (req, res, next) => {
    let scheduleList;
    var range;
    var sort;
    var filter;

    if (req.query && Object.keys(req.query).length) {
      var range = JSON.parse(req.query.range);
      var sort = JSON.parse(req.query.sort);
      var filter = JSON.parse(req.query.filter);
      //console.log(range)
      scheduleList = await ScheduleModel.find(filter, range, sort);
    } else {
      scheduleList = await ScheduleModel.find();
    }

    let count = await ScheduleModel.count(filter);
    if (range && range.length > 1) {
      let content_range = range[0] + "-" + range[1] + "/" + count;
      console.log(content_range);
      res.set("Content-Range", content_range);
    }

    res.send(scheduleList);
  };

  getScheduleById = async (req, res, next) => {
    const schedule = await ScheduleModel.findOne({ id: req.params.id });
    if (!schedule) {
      throw new HttpException(404, "Schedule not found");
    }

    res.send(schedule);
  };

  getScheduleByscheduleName = async (req, res, next) => {
    const schedule = await ScheduleModel.findOne({ schedulename: req.params.schedulename });
    if (!coa) {
      throw new HttpException(404, "Schedule not found");
    }
  };

  createSchedule = async (req, res, next) => {
    this.checkValidation(req);

    const result = await ScheduleModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    const schedule = await ScheduleModel.findOne({ id: result });
    if (!schedule) {
      throw new HttpException(404, "Schedule not found");
    }

    res.status(201).send(schedule);
  };

  updateSchedule = async (req, res, next) => {
    this.checkValidation(req);

    // do the update query and get the result
    // it can be partial edit
    const { ...restOfUpdates } = req.body;
    const result = await ScheduleModel.update(restOfUpdates, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "Schedule not found"
      : affectedRows && changedRows
      ? "Schedule updated successfully"
      : "Updated faild";

    const schedule = await ScheduleModel.findOne({ id: req.params.id });
    if (!schedule) {
      throw new HttpException(404, "Schedule not found");
    }

    res.status(201).send(schedule);
  };

  deleteSchedule = async (req, res, next) => {
    const result = await ScheduleModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, "Schedule not found");
    }
    res.send("Schedule has been deleted");
  };

  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation faild", errors);
    }
  };

  autocomplete = async (req, res, next) => {
    //http://localhost:2000/api/v1/coa?filter={"q":"f"}&range=[0,24]&sort=["id","DESC"]
    let scheduleList;
    var sort;
    var filter;

    if (req.query && Object.keys(req.query).length) {
      var sort = JSON.parse(req.query.sort);
      var filter = JSON.parse(req.query.filter);
      console.log(filter + "   " + sort);
      scheduleList = await ScheduleModel.autocomplete(filter, sort);
    } else {
      scheduleList = await ScheduleModel.autocomplete();
    }

    let content_range = "1-" + scheduleList.length + "/" + scheduleList.length;
    res.set("Content-Range", content_range);
    res.send(scheduleList);
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ScheduleController();
