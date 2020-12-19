const SupplierModel = require('../models/supplier.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              User Controller
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

        
    };

    getSupplierBysupplierName = async (req, res, next) => {
        const supplier = await SupplierModel.findOne({ suppliername: req.params.suppliername });
        if (!supplier) {
            throw new HttpException(404, 'Supplier not found');
        }

        const { password, ...supplierWithoutPassword } = supplier;

        res.send(supplierWithoutPassword);
    };

    
    createSupplier = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await SupplierModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Supplier was created!');
    };

    updateSupplier = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        
        // do the update query and get the result
        // it can be partial edit
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

    supplierLogin = async (req, res, next) => {
        this.checkValidation(req);

        const { code, scode: pass } = req.body;

        const supplier = await SupplierModel.findOne({ code });

        if (!supplier) {
            throw new HttpException(401, 'Unable to login!');
        }

        


    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }


    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new SupplierController;