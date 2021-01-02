const LedgerModel = require('../models/ledger.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Project Controller
 ******************************************************************************/
class LedgerController {
    getAllLedger = async (req, res, next) => {

        let ledgerList;
        var range;
        var sort;
        var filter;

        if (req.query && Object.keys(req.query).length) {
            var range = JSON.parse(req.query.range);
            var sort = JSON.parse(req.query.sort);
            var filter = JSON.parse(req.query.filter);
            //console.log(range)
            ledgerList = await LedgerModel.find(filter, range, sort);
        } else {
            ledgerList = await LedgerModel.find();
        }


        let count = await LedgerModel.count(filter);
        if (range && range.length > 1) {
            let content_range = range[0] + '-' + range[1] + '/' + count
            console.log(content_range);
            res.set('Content-Range', content_range);
        }

        res.send(ledgerList);
    };

    getLedgerById = async (req, res, next) => {
        const ledger = await LedgerModel.findOne({ id: req.params.id });
        if (!ledger) {
            throw new HttpException(404, 'Ledger not found');
        }
        res.send(ledger);

    };

    getLedgerByledgerName = async (req, res, next) => {
        const ledger = await LedgerModel.findOne({ ledgername: req.params.ledgername });
        if (!ledger) {
            throw new HttpException(404, 'Ledger not found');
        }

    };

    createLedger = async (req, res, next) => {
        this.checkValidation(req);

        const result = await LedgerModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        const ledger = await LedgerModel.findOne({ id: result });
        if (!ledger) {
            throw new HttpException(404, 'Ledger not found');
        }

        res.status(201).send(ledger);
    };



    updateLedger = async (req, res, next) => {
        this.checkValidation(req);


        // do the update query and get the result
        // it can be partial edit
        const { ...restOfUpdates } = req.body;
        const result = await LedgerModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Ledger not found' :
            affectedRows && changedRows ? 'Ledger updated successfully' : 'Updated faild';

        const ledger = await LedgerModel.findOne({ id: res.params.id });
        if (!ledger) {
            throw new HttpException(404, 'Ledger not found');
        }

        res.status(201).send(ledger);
    };

    deleteLedger = async (req, res, next) => {
        const result = await LedgerModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Ledger not found');
        }
        res.send('Ledger has been deleted');
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
module.exports = new LedgerController;