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
        let coa_typeList = await Coa_typeModel.find();
        if (!coa_typeList.length) {
            throw new HttpException(404, 'Coa type not found');
        }

        

        res.send(coa_typeList);
    };

    getCoa_typeById = async (req, res, next) => {
        const coa_type = await Coa_typeModel.findOne({ id: req.params.id });
        if (!coa_type) {
            throw new HttpException(404, 'COA Type not found');
        }

        
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

        res.status(201).send('COA Type was created!');
    };

    updateCoa_type = async (req, res, next) => {
        this.checkValidation(req);

                
        // do the update query and get the result
        // it can be partial edit
        const {...restOfUpdates } = req.body;
        const result = await Coa_typeModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Coa Type not found' :
            affectedRows && changedRows ? 'Coa Type updated successfully' : 'Updated faild';

        res.send({ message, info });
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