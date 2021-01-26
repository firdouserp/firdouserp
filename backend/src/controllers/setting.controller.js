const SettingModel = require("../models/setting.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Supplier Controller
 ******************************************************************************/
class SettingController {
  getAllSetting = async (req, res, next) => {
    let settingList;
    var range;
    var sort;
    var filter;

    if (req.query && Object.keys(req.query).length) {
      var range = JSON.parse(req.query.range);
      var sort = JSON.parse(req.query.sort);
      var filter = JSON.parse(req.query.filter);
      //console.log(range)
      settingList = await SettingModel.find(filter, range, sort);
    } else {
      settingList = await SettingModel.find();
    }

    let count = await SettingModel.count(filter);
    if (range && range.length > 1) {
      let content_range = range[0] + "-" + range[1] + "/" + count;
      console.log(content_range);
      res.set("Content-Range", content_range);
    }

    res.send(settingList);
  };

  getSettingById = async (req, res, next) => {
    const setting = await SettingModel.findOne({ id: req.params.id });
    if (!setting) {
      throw new HttpException(404, "Setting not found");
    }

    res.send(setting);
  };

  getSettingBysettingName = async (req, res, next) => {
    const setting = await SettingModel.findOne({ settingname: req.params.settingname });
    if (!setting) {
      throw new HttpException(404, "Setting not found");
    }
  };

  createSetting = async (req, res, next) => {
    this.checkValidation(req);

    const result = await SettingModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    const setting = await SettingModel.findOne({ id: result });
    if (!setting) {
      throw new HttpException(404, "Setting not found");
    }

    res.status(201).send(setting);
  };

  updateSetting = async (req, res, next) => {
    this.checkValidation(req);

    // do the update query and get the result
    // it can be partial edit
    const { ...restOfUpdates } = req.body;
    const result = await SettingModel.update(restOfUpdates, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "Settings not found"
      : affectedRows && changedRows
      ? "Settings updated successfully"
      : "Updated faild";

    const setting = await SettingModel.findOne({ id: req.params.id });
    if (!setting) {
      throw new HttpException(404, "Setting not found");
    }

    res.status(201).send(setting);
  };

  deleteSetting = async (req, res, next) => {
    const result = await SettingModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, "Setting not found");
    }
    res.send("Setting has been deleted");
  };

  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation faild", errors);
    }
  };

  autocomplete = async (req, res, next) => {
    //http://localhost:2000/api/v1/coa?filter={"q":"f"}&range=[0,24]&sort=["id","DESC"]
    let coaList;
    var sort;
    var filter;

    if (req.query && Object.keys(req.query).length) {
      var sort = JSON.parse(req.query.sort);
      var filter = JSON.parse(req.query.filter);
      console.log(filter + "   " + sort);
      coaList = await SettingModel.autocomplete(filter, sort);
    } else {
      settingList = await SettingModel.autocomplete();
    }

    let content_range = "1-" + settingList.length + "/" + settingList.length;
    res.set("Content-Range", content_range);
    res.send(settingList);
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new SettingController();
