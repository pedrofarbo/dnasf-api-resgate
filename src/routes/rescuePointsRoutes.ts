import express from 'express'
const rescuePointsRouter = express.Router();
import RescuePointsController from '../controllers/RescuePointsController';

rescuePointsRouter.get('/all', RescuePointsController.getAll);
rescuePointsRouter.get('/:id', RescuePointsController.getById);
rescuePointsRouter.post('/', RescuePointsController.create);
rescuePointsRouter.put('/:id', RescuePointsController.putToRescued);

module.exports = rescuePointsRouter;

export default rescuePointsRouter;