const ClientsModel = require('../models/clients.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Supplier Controller
 ******************************************************************************/
class ClientsController {
    getAllClients = async (req, res, next) => {
       
        let clientsList;
        var range;
        var sort ;
        var filter;
      
        if(req.query && Object.keys(req.query).length){
            var range = JSON.parse(req.query.range);
            var sort = JSON.parse(req.query.sort);
            var filter = JSON.parse(req.query.filter);
            //console.log(range)
            clientsList = await ClientsModel.find(filter,range,sort);
        }else{
            clientsList = await ClientsModel.find();
        }
      
       
        let count = await ClientsModel.count(filter);
        if(range && range.length>1){
            let content_range = range[0] + '-' + range[1] + '/' + count
            console.log(content_range);
            res.set('Content-Range',content_range);
        }

        res.send(clientsList);
    };

    getClientsById = async (req, res, next) => {
        const clients = await ClientsModel.findOne({ id: req.params.id });
        if (!clients) {
            throw new HttpException(404, 'Clients not found');
        }

            res.send(clients)
    };

    getClientsByClientsName = async (req, res, next) => {
        const clients = await ClientsModel.findOne({ clientsname: req.params.clientsname });
        if (!clients) {
            throw new HttpException(404, 'Clients not found');
        }

        };
    
        createClients = async (req, res, next) => {
            this.checkValidation(req);
            
             const result = await ClientsModel.create(req.body);
    
            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }
    
            const clients = await ClientsModel.findOne({ id: result });
            if (!clients) {
                throw new HttpException(404, 'Clients not found');
            }
    
            res.status(201).send(clients);
        };
    
    updateClients = async (req, res, next) => {
        this.checkValidation(req);

                
        // do the update query and get the result
        // it can be partial edit
        const {...restOfUpdates } = req.body;
        console.log(req.body);
        const result = await ClientsModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Clients not found' :
            affectedRows && changedRows ? 'Clients updated successfully' : 'Updated faild';

            const clients = await ClientsModel.findOne({ id:  req.params.id });
            if (!clients) {
                throw new HttpException(404, 'Clients not found');
            }
    
            res.status(201).send(clients);
      
    };

    deleteClients = async (req, res, next) => {
        const result = await ClientsModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Clients not found');
        }
        res.send('Clients has been deleted');
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
module.exports = new ClientsController;