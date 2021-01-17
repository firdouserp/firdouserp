const Purchase_orderModel = require("../models/purchase_order.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Purchse Order Controller
 ******************************************************************************/
class Purchase_orderController {
  getAllPurchase_order = async (req, res, next) => {
    let purchase_orderList;
    var range;
    var sort;
    var filter;

    if (req.query && Object.keys(req.query).length) {
      var range = req.query.range && JSON.parse(req.query.range);
      var sort = req.query.sort && JSON.parse(req.query.sort);
      var filter = req.query.filter && JSON.parse(req.query.filter);
      purchase_orderList = await Purchase_orderModel.find(filter, range, sort);
    } else {
      purchase_orderList = await Purchase_orderModel.find();
    }

    let count = await Purchase_orderModel.count(filter);
    if (range && range.length > 1) {
      let content_range = range[0] + "-" + range[1] + "/" + count;
      console.log(content_range);
      res.set("Content-Range", content_range);
    }

    res.send(purchase_orderList);
  };

  getPurchase_orderById = async (req, res, next) => {
    const purchase_order = await Purchase_orderModel.findOne({ id: req.params.id });
    if (!purchase_order) {
      throw new HttpException(404, "Purchase Order not found");
    }
    res.send(purchase_order);
  };

  getPurchase_orderBypurchase_orderName = async (req, res, next) => {
    const purchase_order = await Purchase_orderModel.findOne({
      purchase_ordername: req.params.purchase_ordername,
    });
    if (!purchase_order) {
      throw new HttpException(404, "Purchase Order not found");
    }
  };

  createPurchase_order = async (req, res, next) => {
    this.checkValidation(req);

    const result = await Purchase_orderModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    const purchase_order = await Purchase_orderModel.findOne({ id: result });
    if (!purchase_order) {
      throw new HttpException(404, "Purchase Order not found");
    }

    res.status(201).send(purchase_order);
  };

  updatePurchase_order = async (req, res, next) => {
    this.checkValidation(req);

    // do the update query and get the result
    // it can be partial edit
    const { ...restOfUpdates } = req.body;
    const result = await Purchase_orderModel.update(req.body);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "Purchase Order not found"
      : affectedRows && changedRows
        ? "Purchase Order updated successfully"
        : "Updated faild";
    const purchase_order = await Purchase_orderModel.findOne({ id: req.params.id });
    if (!purchase_order) {
      throw new HttpException(404, "Project not found");
    }

    res.status(201).send(purchase_order);
  };

  deletePurchase_order = async (req, res, next) => {
    const result = await Purchase_orderModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, " Purchase order not found");
    }
    res.send(" Purchase order has been deleted");
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
module.exports = new Purchase_orderController();
