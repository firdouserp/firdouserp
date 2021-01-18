const FpropModel = require("../models/fprop.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              fprop Controller
 ******************************************************************************/
class FpropController {
  getAllFprop = async (req, res, next) => {
    let fpropList;
    var range;
    var sort;
    var filter;

    if (req.query && Object.keys(req.query).length) {
      var range = req.query.range && JSON.parse(req.query.range);
      var sort = req.query.sort && JSON.parse(req.query.sort);
      var filter = req.query.filter && JSON.parse(req.query.filter);
      //console.log(range)
      fpropList = await FpropModel.find(filter, range, sort);
    } else {
      fpropList = await FpropModel.find();
    }

    let count = await FpropModel.count(filter);
    if (range && range.length > 1) {
      let content_range = range[0] + "-" + range[1] + "/" + count;
      console.log(content_range);
      res.set("Content-Range", content_range);
    }

    res.send(fpropList);
  };

  getfpropById = async (req, res, next) => {
    const fprop = await FpropModel.findOne({ id: req.params.id });
    if (!fprop) {
      throw new HttpException(404, "Fprop Type not found");
    }
    res.send(fprop);
  };

  getfpropByfpropName = async (req, res, next) => {
    const fprop = await FpropModel.findOne({ fpropname: req.params.fpropname });
    if (!fprop) {
      throw new HttpException(404, "Fprop Type not found");
    }
  };

  createfprop = async (req, res, next) => {
    this.checkValidation(req);

    const result = await FpropModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    const fprop = await FpropModel.findOne({ id: result });
    if (!fprop) {
      throw new HttpException(404, "Fprop type not found");
    }

    res.status(201).send(fprop);
  };

  updatefprop = async (req, res, next) => {
    this.checkValidation(req);

    // do the update query and get the result
    // it can be partial edit
    const { ...restOfUpdates } = req.body;
    console.log("updating controller");
    const result = await FpropModel.update(restOfUpdates, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "Fprop Type not found"
      : affectedRows && changedRows
      ? "Fprop Type updated successfully"
      : "Updated faild";

    const fprop = await FpropModel.findOne({ id: req.params.id });
    if (!fprop) {
      throw new HttpException(404, "Frop type not found");
    }

    res.status(201).send(fprop);
  };

  deletefprop = async (req, res, next) => {
    const result = await FpropModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, "Fprop type not found");
    }
    res.send("Fprop type has been deleted");
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
module.exports = new FpropController();
