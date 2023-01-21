import {
    planets
} from '../../planets.js'




function getAllPlanets(req, res) {
    res.status(200).json(planets)
}

export {
    getAllPlanets
}