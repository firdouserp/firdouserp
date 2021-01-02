const Coa_typeModel = require('../models/coa_type.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              COA_TYPE Controller
 ******************************************************************************/
class Coa_typeController {
    getAllCoa_type = async (req, res, next) => {

        let coa_typeList;
        var range;
        var sort;
        var filter;

        if (req.query && Object.keys(req.query).length) {
            var range = JSON.parse(req.query.range);
            var sort = JSON.parse(req.query.sort);
            var filter = JSON.parse(req.query.filter);
            //console.log(range)
            coa_typeList = await Coa_typeModel.find(filter, range, sort);
        } else {
            coa_typeList = await Coa_typeModel.find();
        }


        let count = await Coa_typeModel.count(filter);
        if (range && range.length > 1) {
            let content_range = range[0] + '-' + range[1] + '/' + count
            console.log(content_range);
            res.set('Content-Range', content_range);
        }

        res.send(coa_typeList);
    };

    getCoa_typeById = async (req, res, next) => {
        const coa_type = await Coa_typeModel.findOne({ id: req.params.id });
        if (!coa_type) {
            throw new HttpException(404, 'COA Type not found');
        }
        res.send(coa_type);

    };

    getCoa_typeBycoa_typeName = async (req, res, next) => {
        const coa_type = await Coa_typeModel.findOne({ coa_typename: req.params.coa_typename });
        if (!coa_type) {
            throw new HttpException(404, 'COA Type not found');
        }

    };

    createCoa_type = async (req, res, next) => {
        this.checkValidation(req);

        const result = await Coa_typeModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        const coa_type = await Coa_typeModel.findOne({ id: result });
        if (!coa_type) {
            throw new HttpException(404, 'coa type not found');
        }

        res.status(201).send(coa_type);
    };


    updateCoa_type = async (req, res, next) => {
        this.checkValidation(req);


        // do the update query and get the result
        // it can be partial edit
        const { ...restOfUpdates } = req.body;
        console.log("updating controller");
        const result = await Coa_typeModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Coa Type not found' :
            affectedRows && changedRows ? 'Coa Type updated successfully' : 'Updated faild';

        const coa_type = await Coa_typeModel.findOne({ id: req.params.id });
        if (!coa_type) {
            throw new HttpException(404, 'coa type not found');
        }

        res.status(201).send(coa_type);
    };

    deleteCoa_type = async (req, res, next) => {
        const result = await Coa_typeModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Coa type not found');
        }
        res.send('Coa type has been deleted');
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
module.exports = new Coa_typeController;