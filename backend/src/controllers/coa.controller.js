const CoaModel = require('../models/coa.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Supplier Controller
 ******************************************************************************/
class CoaController {
    getAllCoa = async (req, res, next) => {
        let coaList = await CoaModel.find();
        if (!coaList.length) {
            throw new HttpException(404, 'Coa not found');
        }

        

        res.send(coaList);
    };

    getCoaById = async (req, res, next) => {
        const coa = await CoaModel.findOne({ id: req.params.id });
        if (!coa) {
            throw new HttpException(404, 'COA not found');
        }

        
    };

    getCoaBycoaName = async (req, res, next) => {
        const coa = await CoaModel.findOne({ coaname: req.params.coaname });
        if (!coa) {
            throw new HttpException(404, 'COA not found');
        }

        };
    
    createCoa = async (req, res, next) => {
        this.checkValidation(req);
        
         const result = await CoaModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('COA was created!');
    };

    updateCoa = async (req, res, next) => {
        this.checkValidation(req);

                
        // do the update query and get the result
        // it can be partial edit
        const result = await CoaModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Coas not found' :
            affectedRows && changedRows ? 'Coa updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteCoa = async (req, res, next) => {
        const result = await CoaModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Coa not found');
        }
        res.send('Coa has been deleted');
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
module.exports = new CoaController;