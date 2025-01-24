const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController');
const stateValidation = require('../validations/stateValidation');

// Routes for states
router.post('/', stateValidation, stateController.addState);
router.get('/:name/population', stateController.getStatePopulation);
router.get('/total-population', stateController.getTotalPopulation);
router.get('/average-density', stateController.getAverageDensity);
router.get('/', stateController.getAllStates);

module.exports = router;
