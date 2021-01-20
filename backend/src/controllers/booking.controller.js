const BookingModel = require("../models/booking.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Booking Controller
 ******************************************************************************/
class BookingController {
  getAllBooking = async (req, res, next) => {
    let bookingList;
    var range;
    var sort;
    var filter;

    if (req.query && Object.keys(req.query).length) {
      var range = JSON.parse(req.query.range);
      var sort = JSON.parse(req.query.sort);
      var filter = JSON.parse(req.query.filter);
      //console.log(range)
      bookingList = await BookingModel.find(filter, range, sort);
    } else {
      bookingList = await BookingModel.find();
    }

    let count = await BookingModel.count(filter);
    if (range && range.length > 1) {
      let content_range = range[0] + "-" + range[1] + "/" + count;
      console.log(content_range);
      res.set("Content-Range", content_range);
    }

    res.send(bookingList);
  };

  getBookingById = async (req, res, next) => {
    const booking = await BookingModel.findOne({ id: req.params.id });
    if (!booking) {
      throw new HttpException(404, "COA not found");
    }

    res.send(booking);
  };

  getBookingBybookingName = async (req, res, next) => {
    const booking = await BookingModel.findOne({ coaname: req.params.coaname });
    if (!booking) {
      throw new HttpException(404, "Booking not found");
    }
  };

  createBooking = async (req, res, next) => {
    this.checkValidation(req);

    const result = await BookingModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    const booking = await BookingModel.findOne({ id: result });
    if (!booking) {
      throw new HttpException(404, "Booking not found");
    }

    res.status(201).send(booking);
  };

  updateBooking = async (req, res, next) => {
    this.checkValidation(req);

    // do the update query and get the result
    // it can be partial edit
    const { ...restOfUpdates } = req.body;
    const result = await BookingModel.update(restOfUpdates, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "Booking not found"
      : affectedRows && changedRows
      ? "Booking updated successfully"
      : "Updated faild";

    const booking = await BookingModel.findOne({ id: req.params.id });
    if (!booking) {
      throw new HttpException(404, "Coa not found");
    }

    res.status(201).send(booking);
  };

  deleteBooking = async (req, res, next) => {
    const result = await BookingModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, "Booking not found");
    }
    res.send("Booking has been deleted");
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
module.exports = new BookingController();
