const GrnModel = require('../models/grn.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              GRN Controller
 ******************************************************************************/
class GrnController {
    getAllGrn = async (req, res, next) => {

        let grnList;
        var range;
        var sort;
        var filter;

        if (req.query && Object.keys(req.query).length) {
            var range = JSON.parse(req.query.range);
            var sort = JSON.parse(req.query.sort);
            var filter = JSON.parse(req.query.filter);
            //console.log(range)
            grnList = await GrnModel.find(filter, range, sort);
        } else {
            grnList = await GrnModel.find();
        }


        let count = await GrnModel.count(filter);
        if (range && range.length > 1) {
            let content_range = range[0] + '-' + range[1] + '/' + count
            console.log(content_range);
            res.set('Content-Range', content_range);
        }

        res.send(grnList);
    };

    getGrnById = async (req, res, next) => {
        const grn = await GrnModel.findOne({ id: req.params.id });
        if (!grn) {
            throw new HttpException(404, 'GRN not found');
        }
        res.send(grn);

    };

    getGrnBygrnName = async (req, res, next) => {
        const grn = await GrnModel.findOne({ grnname: req.params.grnname });
        if (!grn) {
            throw new HttpException(404, 'GRN Type not found');
        }

    };

    createGrn = async (req, res, next) => {
        this.checkValidation(req);

        const result = await GrnModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        const grn = await GrnModel.findOne({ id: result });
        if (!grn) {
            throw new HttpException(404, 'GRN type not found');
        }

        res.status(201).send(grn);
    };


    updateGrn = async (req, res, next) => {
        this.checkValidation(req);


        // do the update query and get the result
        // it can be partial edit
        const { ...restOfUpdates } = req.body;
        console.log("updating controller");
        const result = await GrnModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Grn not found' :
            affectedRows && changedRows ? 'Grn updated successfully' : 'Updated faild';

        const grn = await GrnModel.findOne({ id: req.params.id });
        if (!grn) {
            throw new HttpException(404, 'grn type not found');
        }

        res.status(201).send(grn);
    };

    deleteGrn = async (req, res, next) => {
        const result = await GrnModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'GRN type not found');
        }
        res.send('GRN type has been deleted');
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new GrnController;