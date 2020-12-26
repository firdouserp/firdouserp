const UnitsModel = require('../models/units.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Units Controller
 ******************************************************************************/
class UnitsController {
    getAllUnits = async (req, res, next) => {
        let unitsList = await UnitsModel.find();
        if (!unitsList.length) {
            throw new HttpException(404, 'Unit not found');
        }

        

        res.send(unitsList);
    };

    getUnitsById = async (req, res, next) => {
        const units = await UnitsModel.findOne({ id: req.params.id });
        if (!units) {
            throw new HttpException(404, 'Unit not found');
        }

        
    };

    getUnitsByUnitsName = async (req, res, next) => {
        const units = await UnitsModel.findOne({ unitsname: req.params.unitsname });
        if (!units) {
            throw new HttpException(404, 'Unit not found');
        }

        };
    
        createUnits = async (req, res, next) => {
            this.checkValidation(req);
            
             const result = await UnitsModel.create(req.body);
    
            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }
    
            const units = await UnitsModel.findOne({ id: result });
            if (!units) {
                throw new HttpException(404, 'Units not found');
            }
    
            res.status(201).send(units);
        };
    
    updateUnit = async (req, res, next) => {
        this.checkValidation(req);

                
        // do the update query and get the result
        // it can be partial edit
        const {...restOfUpdates } = req.body;
        console.log(req.body);
        const result = await UnitsModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Unit not found' :
            affectedRows && changedRows ? 'Unit updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteUnits = async (req, res, next) => {
        const result = await UnitsModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Unit not found');
        }
        res.send('Unit has been deleted');
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
module.exports = new UnitsController;