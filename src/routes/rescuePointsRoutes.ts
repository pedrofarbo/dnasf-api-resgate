import express from 'express'
const rescuePointsRouter = express.Router();
const controller = require('../controllers/rescuePointsController');

rescuePointsRouter.get('/all', controller.getAll);
rescuePointsRouter.get('/:id', controller.getById);
rescuePointsRouter.post('/', controller.create);
rescuePointsRouter.put('/:id', controller.putToRescued);

module.exports = rescuePointsRouter;

export default rescuePointsRouter;