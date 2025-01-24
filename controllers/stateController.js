const State = require('../models/State');

// Insert a new state
exports.addState = async (req, res, next) => {
    try {
        const state = new State(req.body);
        await state.save();
        res.status(201).json({ success: true, state });
    } catch (err) {
        next(err);  
    }
};

// Get population of a state by name
exports.getStatePopulation = async (req, res, next) => {
    try {
        const state = await State.findOne({ name: req.params.name });
        if (!state) {
            const error = new Error('State not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json({ success: true, population: state.population });
    } catch (err) {
        next(err);  
    }
};

// Get total population of all states
exports.getTotalPopulation = async (req, res, next) => {
    try {
        const states = await State.find();
        const totalPopulation = states.reduce((sum, state) => sum + state.population, 0);
        res.status(200).json({ success: true, totalPopulation });
    } catch (err) {
        next(err);  
    }
};

// Get average population density for all states
exports.getAverageDensity = async (req, res, next) => {
    try {
        const states = await State.find();
        const density = states.map(state => ({
            name: state.name,
            avgDensity: state.population / state.area
        }));
        res.status(200).json({ success: true, density });
    } catch (err) {
        next(err);  
    }
};

// Get all states
exports.getAllStates = async (req, res, next) => {
    try {
        const states = await State.find();
        res.status(200).json({ success: true, states });
    } catch (err) {
        next(err); 
    }
};
