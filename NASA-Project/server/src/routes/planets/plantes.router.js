import {
    Router
} from 'express';
import {
    getAllPlanets
} from './planets.controllers.js'
const planetsRouter = Router()

planetsRouter.get('/', getAllPlanets)

export default planetsRouter;