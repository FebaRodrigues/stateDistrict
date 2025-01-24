const express = require('express');
const router = express.Router();
const districtController = require('../controllers/districtController');
const districtValidation = require('../validations/districtValidation');

// Routes for districts
router.post('/', districtValidation, districtController.addDistrict);
router.put('/:name/population', districtController.updateDistrictPopulation);
router.delete('/:name', districtController.deleteDistrict);
router.get('/', districtController.getAllDistricts);
router.get('/group-by-state', districtController.groupDistrictsByState);
router.get('/with-states', districtController.joinDistrictsWithStates);

module.exports = router;
