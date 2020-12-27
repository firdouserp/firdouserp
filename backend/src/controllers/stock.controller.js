const StockModel = require('../models/stock.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Supplier Controller
 ******************************************************************************/
class StockController {
    getAllStock = async (req, res, next) => {
        let stockList = await StockModel.find();
        if (!stockList.length) {
            throw new HttpException(404, 'Unit not found');
        }

        

        res.send(stockList);
    };

    getStockById = async (req, res, next) => {
        const stock = await StockModel.findOne({ id: req.params.id });
        if (!Stock) {
            throw new HttpException(404, 'Stock not found');
        }

        
    };

    getStockByStockName = async (req, res, next) => {
        const stock = await StockModel.findOne({ stockname: req.params.stockname });
        if (!stock) {
            throw new HttpException(404, 'Stock not found');
        }

        };
    
        createStock = async (req, res, next) => {
            this.checkValidation(req);
            
             const result = await StockModel.create(req.body);
    
            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }
    
            const stock = await StockModel.findOne({ id: result });
            if (!stock) {
                throw new HttpException(404, 'Stock not found');
            }
    
            res.status(201).send(stock);
        };
    
    updateStock = async (req, res, next) => {
        this.checkValidation(req);

                
        // do the update query and get the result
        // it can be partial edit
        const {...restOfUpdates } = req.body;
        console.log(req.body);
        const result = await StockModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Stock not found' :
            affectedRows && changedRows ? 'Stock updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteStock = async (req, res, next) => {
        const result = await StockModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Stock not found');
        }
        res.send('Stock has been deleted');
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
module.exports = new StockController;