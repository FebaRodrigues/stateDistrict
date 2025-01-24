const District = require('../models/District');

// Insert a new district
exports.addDistrict = async (req, res, next) => {
    try {
        const district = new District(req.body);
        await district.save();
        res.status(201).json({ success: true, district });
    } catch (err) {
        next(err);  
    }
};

// Update population of a district
exports.updateDistrictPopulation = async (req, res, next) => {
    try {
        const district = await District.findOneAndUpdate(
            { name: req.params.name },
            { population: req.body.population },
            { new: true }
        );
        if (!district) {
            const error = new Error('District not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json({ success: true, district });
    } catch (err) {
        next(err);  
    }
};

// Delete a district
exports.deleteDistrict = async (req, res, next) => {
    try {
        const district = await District.findOneAndDelete({ name: req.params.name });
        if (!district) {
            const error = new Error('District not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json({ success: true, message: 'District deleted' });
    } catch (err) {
        next(err);  
    }
};

// Get all districts
exports.getAllDistricts = async (req, res, next) => {
    try {
        const districts = await District.find();
        res.status(200).json({ success: true, districts });
    } catch (err) {
        next(err);  
    }
};

// Group districts by state and calculate total population
exports.groupDistrictsByState = async (req, res, next) => {
    try {
        const result = await District.aggregate([
            {
                $group: {
                    _id: "$state_id",
                    totalPopulation: { $sum: "$population" }
                }
            },
            {
                $sort: { totalPopulation: -1 }
            }
        ]);
        res.status(200).json({ success: true, result });
    } catch (err) {
        next(err);  
    }
};

// Join districts with state data
exports.joinDistrictsWithStates = async (req, res, next) => {
    try {
        const result = await District.aggregate([
            {
                $lookup: {
                    from: 'states',
                    localField: 'state_id',
                    foreignField: '_id',
                    as: 'stateDetails'
                }
            }
        ]);
        res.status(200).json({ success: true, result });
    } catch (err) {
        next(err);  
    }
};
