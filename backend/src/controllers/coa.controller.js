const CoaModel = require("../models/coa.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Supplier Controller
 ******************************************************************************/
class CoaController {
  getAllCoa = async (req, res, next) => {
    let coaList;
    var range;
    var sort;
    var filter;

    if (req.query && Object.keys(req.query).length) {
      var range = JSON.parse(req.query.range);
      var sort = JSON.parse(req.query.sort);
      var filter = JSON.parse(req.query.filter);
      //console.log(range)
      coaList = await CoaModel.find(filter, range, sort);
    } else {
      coaList = await CoaModel.find();
    }

    let count = await CoaModel.count(filter);
    if (range && range.length > 1) {
      let content_range = range[0] + "-" + range[1] + "/" + count;
      console.log(content_range);
      res.set("Content-Range", content_range);
    }

    res.send(coaList);
  };

  getCoaById = async (req, res, next) => {
    const coa = await CoaModel.findOne({ id: req.params.id });
    if (!coa) {
      throw new HttpException(404, "COA not found");
    }

    res.send(coa);
  };

  getCoaBycoaName = async (req, res, next) => {
    const coa = await CoaModel.findOne({ coaname: req.params.coaname });
    if (!coa) {
      throw new HttpException(404, "COA not found");
    }
  };

  createCoa = async (req, res, next) => {
    this.checkValidation(req);

    const result = await CoaModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    const coa = await CoaModel.findOne({ id: result });
    if (!coa) {
      throw new HttpException(404, "Coa not found");
    }

    res.status(201).send(coa);
  };

  updateCoa = async (req, res, next) => {
    this.checkValidation(req);

    // do the update query and get the result
    // it can be partial edit
    const { ...restOfUpdates } = req.body;
    const result = await CoaModel.update(restOfUpdates, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "Coas not found"
      : affectedRows && changedRows
      ? "Coa updated successfully"
      : "Updated faild";

    const coa = await CoaModel.findOne({ id: req.params.id });
    if (!coa) {
      throw new HttpException(404, "Coa not found");
    }

    res.status(201).send(coa);
  };

  deleteCoa = async (req, res, next) => {
    const result = await CoaModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, "Coa not found");
    }
    res.send("Coa has been deleted");
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
      coaList = await CoaModel.autocomplete(filter, sort);
    } else {
      coaList = await CoaModel.autocomplete();
    }

    let content_range = "1-" + coaList.length + "/" + coaList.length;
    res.set("Content-Range", content_range);
    res.send(coaList);
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new CoaController();
