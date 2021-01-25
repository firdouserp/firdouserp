const VouchersModel = require("../models/vouchers.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Vouchers Controller
 ******************************************************************************/
class VouchersController {
  getAllVouchers = async (req, res, next) => {
    let vouchersList;
    var range;
    var sort;
    var filter;

    if (req.query && Object.keys(req.query).length) {
      var range = JSON.parse(req.query.range);
      var sort = JSON.parse(req.query.sort);
      var filter = JSON.parse(req.query.filter);
      //console.log(range)
      vouchersList = await VouchersModel.find(filter, range, sort);
    } else {
      vouchersList = await VouchersModel.find();
    }

    let count = await VouchersModel.count(filter);
    if (range && range.length > 1) {
      let content_range = range[0] + "-" + range[1] + "/" + count;
      console.log(content_range);
      res.set("Content-Range", content_range);
    }

    res.send(vouchersList);
  };

  getVouchersById = async (req, res, next) => {
    const vouchers = await VouchersModel.findOne({ id: req.params.id });
    if (!vouchers) {
      throw new HttpException(404, " getVouchersById Voucher not found");
    }
    res.send(vouchers);
  };

  getVouchersThisMonth = async (req, res, next) => {
    console.log("get Vouchers");
    const vouchers = await VouchersModel.voucherThisMonth();
    if (!vouchers) {
      throw new HttpException(404, "Voucher not found");
    }
    let content_range = "1-" + vouchers.length + "/" + vouchers.length;
    console.log(content_range);
    res.set("Content-Range", content_range);
    res.send(vouchers);
  };
  getVoucherDetail = async (req, res, next) => {
    console.log("get Voucher Detail");
    const vouchers = await VouchersModel.voucherDetail();
    if (!vouchers) {
      throw new HttpException(404, "Voucher not found");
    }
    let content_range = "1-" + vouchers.length + "/" + vouchers.length;
    console.log(content_range);
    res.set("Content-Range", content_range);
    res.send(vouchers);
  };
  getInvalidVouchers = async (req, res, next) => {
    console.log("get Invalid Vouchers");
    const vouchers = await VouchersModel.invalidVoucher();
    if (!vouchers) {
      throw new HttpException(404, "Voucher not found");
    }
    let content_range = "1-" + vouchers.length + "/" + vouchers.length;
    console.log(content_range);
    res.set("Content-Range", content_range);
    res.send(vouchers);
  };

  getVouchersByVouchersName = async (req, res, next) => {
    const vouchers = await VouchersModel.findOne({
      vouchersname: req.params.vouchersname,
    });
    if (!vouchers) {
      throw new HttpException(404, "Voucher not found");
    }
  };

  createVouchers = async (req, res, next) => {
    this.checkValidation(req);

    const result = await VouchersModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    const vouchers = await VouchersModel.findOne({ id: result });
    if (!vouchers) {
      throw new HttpException(404, "Voucher not found");
    }

    res.status(201).send(vouchers);
  };

  updateVouchers = async (req, res, next) => {
    this.checkValidation(req);
    const result = await VouchersModel.update(req.body);
    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "Voucher not found"
      : affectedRows && changedRows
        ? "Voucher updated successfully"
        : "Updated failed";

    const vouchers = await VouchersModel.findOne({ id: req.params.id });
    if (!vouchers) {
      throw new HttpException(404, "Voucher not found");
    }

    res.status(201).send(vouchers);
  };

  deleteVouchers = async (req, res, next) => {
    const result = await VouchersModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, "Voucher not found");
    }
    res.send("Voucher has been deleted");
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
module.exports = new VouchersController();
