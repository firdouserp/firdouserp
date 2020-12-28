const NotesModel = require('../models/notes.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Units Controller
 ******************************************************************************/
class NotesController {
    getAllNotes = async (req, res, next) => {
       
        let notesList;
        var range;
        var sort ;
        var filter;
      
        if(req.query && Object.keys(req.query).length){
            var range = JSON.parse(req.query.range);
            var sort = JSON.parse(req.query.sort);
            var filter = JSON.parse(req.query.filter);
            //console.log(range)
            notesList = await NotesModel.find(filter,range,sort);
        }else{
            notesList = await NotesModel.find();
        }
      
       
        let count = await notesModel.count(filter);
        if(range && range.length>1){
            let content_range = range[0] + '-' + range[1] + '/' + count
            console.log(content_range);
            res.set('Content-Range',content_range);
        }

        res.send(notesList);
    };

    getNotesById = async (req, res, next) => {
        const notes = await NotesModel.findOne({ id: req.params.id });
        if (!notes) {
            throw new HttpException(404, 'Unit not found');
        }

        
    };

    getNotesByNotesName = async (req, res, next) => {
        const Notes = await NotesModel.findOne({ notesname: req.params.notesname });
        if (!notes) {
            throw new HttpException(404, 'Note not found');
        }

        };
    
        createNotes = async (req, res, next) => {
            this.checkValidation(req);
            
             const result = await NotesModel.create(req.body);
    
            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }
    
            const notes = await NotesModel.findOne({ id: result });
            if (!notes) {
                throw new HttpException(404, 'Notes not found');
            }
    
            res.status(201).send(notes);
        };
    
    updateNotes = async (req, res, next) => {
        this.checkValidation(req);

                
        // do the update query and get the result
        // it can be partial edit
        const {...restOfUpdates } = req.body;
        console.log(req.body);
        const result = await NotesModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Note not found' :
            affectedRows && changedRows ? 'Note updated successfully' : 'Updated faild';

            const notes = await NotesModel.findOne({ id: result });
            if (!notes) {
                throw new HttpException(404, 'Units not found');
            }
    
            res.status(201).send(notes);
    };

    deleteNotes = async (req, res, next) => {
        const result = await NotesModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Notes not found');
        }
        res.send('Notes has been deleted');
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
module.exports = new NotesController;