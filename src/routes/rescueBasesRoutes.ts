import express from 'express'
const rescueBaseRouter = express.Router();
import RescueBaseController from '../controllers/RescueBaseController';

rescueBaseRouter.get('/all', RescueBaseController.getAll);
rescueBaseRouter.get('/:id', RescueBaseController.getById);
rescueBaseRouter.post('/', RescueBaseController.create);

module.exports = rescueBaseRouter;

export default rescueBaseRouter;