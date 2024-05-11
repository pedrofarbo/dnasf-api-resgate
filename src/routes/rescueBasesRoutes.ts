import express from 'express'
const rescueBaseRouter = express.Router();
const controller = require('../controllers/rescueBaseController');

rescueBaseRouter.get('/all', controller.getAll);
rescueBaseRouter.get('/:id', controller.getById);
rescueBaseRouter.post('/', controller.create);

module.exports = rescueBaseRouter;

export default rescueBaseRouter;