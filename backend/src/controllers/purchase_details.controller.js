const Purchase_detailsModel = require("../models/purchase_details.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Purchse Order Controller
 ******************************************************************************/
class Purchase_detailsController {
  getAllPurchase_details = async (req, res, next) => {
    let purchase_detailsList;
    var range;
    var sort;
    var filter;

    if (req.query && Object.keys(req.query).length) {
      var range = req.query.range && JSON.parse(req.query.range);
      var sort = req.query.sort && JSON.parse(req.query.sort);
      var filter = req.query.filter && JSON.parse(req.query.filter);
      purchase_detailsList = await Purchase_detailsModel.find(filter, range, sort);
    } else {
      purchase_detailsList = await Purchase_detailsModel.find();
    }

    let count = await Purchase_detailsModel.count(filter);
    if (range && range.length > 1) {
      let content_range = range[0] + "-" + range[1] + "/" + count;
      console.log(content_range);
      res.set("Content-Range", content_range);
    }

    res.send(purchase_detailsList);
  };

  getPurchase_detailsById = async (req, res, next) => {
    const purchase_details = await purchase_detailsModel.findOne({ id: req.params.id });
    if (!purchase_details) {
      throw new HttpException(404, "Purchase Order not found");
    }
    res.send(purchase_details);
  };

  getPurchase_detailsBypurchase_detailsName = async (req, res, next) => {
    const purchase_details = await Purchase_detailsModel.findOne({
      purchase_detailsname: req.params.purchase_detailsname,
    });
    if (!purchase_details) {
      throw new HttpException(404, "Purchase details not found");
    }
  };

  createPurchase_details = async (req, res, next) => {
    this.checkValidation(req);

    const result = await Purchase_detailsModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    const  purchase_details = await  Purchase_detailsModel.findOne({ id: result });
    if (! purchase_details) {
      throw new HttpException(404, "Purchase details not found");
    }

    res.status(201).send(purchase_details);
  };

  updatePurchase_details = async (req, res, next) => {
    this.checkValidation(req);

    // do the update query and get the result
    // it can be partial edit
    const { ...restOfUpdates } = req.body;
    const result = await  Purchase_detailsModel.update(restOfUpdates, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "Purchase Details not found"
      : affectedRows && changedRows
      ? "Purchase Details updated successfully"
      : "Updated faild";
    const  purchase_details = await  Purchase_detailsModel.findOne({ id: req.params.id });
    if (!purchase_details) {
      throw new HttpException(404, "Purchase Details not found");
    }

    res.status(201).send(purchase_details);
  };

  deletePurchase_details = async (req, res, next) => {
    const result = await Purchase_detailsModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, " Purchase details not found");
    }
    res.send(" Purchase details has been deleted");
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
module.exports = new Purchase_detailsController();
