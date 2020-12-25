const SupplierModel = require('../models/supplier.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Supplier Controller
 ******************************************************************************/
class SupplierController {
    getAllSuppliers = async (req, res, next) => {
        let supplierList = await SupplierModel.find();
        if (!supplierList.length) {
            throw new HttpException(404, 'Supplier not found');
        }

        

        res.send(supplierList);
    };

    getSupplierById = async (req, res, next) => {
        const supplier = await SupplierModel.findOne({ id: req.params.id });
        if (!supplier) {
            throw new HttpException(404, 'Supplier not found');
        }

        res.send(supplier);
    };

    getSupplierBysupplierName = async (req, res, next) => {
        const supplier = await SupplierModel.findOne({ suppliername: req.params.suppliername });
        if (!supplier) {
            throw new HttpException(404, 'Supplier not found');
        }

        res.send(supplier);
    };
    
    createSupplier = async (req, res, next) => {
        this.checkValidation(req);
        
         const result = await SupplierModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        const supplier = await SupplierModel.findOne({ id: result });
        if (!supplier) {
            throw new HttpException(404, 'Supplier not found');
        }

        res.status(201).send(supplier);
    };

    updateSupplier = async (req, res, next) => {
        this.checkValidation(req);

                
        // do the update query and get the result
        // it can be partial edit
        const {...restOfUpdates } = req.body;
        const result = await SupplierModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Supplier not found' :
            affectedRows && changedRows ? 'Supplier updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteSupplier = async (req, res, next) => {
        const result = await SupplierModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Supplier not found');
        }
        res.send('Supplier has been deleted');
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
module.exports = new SupplierController;