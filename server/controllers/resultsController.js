const resultsService = require('../service/resultsService');
const ApiError = require('../error/ApiError');



const getBestResults = async (req, res, next) => {
    const {year, style, distance} = req.query;
    try {
        const bestResults = await resultsService.getBestResultsForYear(year, style, distance);
        res.json(bestResults);
    } catch (error) {
        next(ApiError.internal('Error fetching best results'));
    }
};


const getAllResults = async (req, res, next) => {
    try {
        const results = await resultsService.getAllResults();
        res.json(results);
    } catch (error) {
        next(ApiError.internal('Error fetching all results'));
    }
};


const addResult = async (req, res, next) => {
    try {
        const newResult = await resultsService.addResult(req.body);
        res.status(201).json(newResult);
    } catch (error) {
        next(ApiError.badRequest(error.message));
    }
};


const updateResult = async (req, res, next) => {
    const {id} = req.params;
    try {
        const updatedResult = await resultsService.updateResult(id, req.body);
        if (!updatedResult) {
            return next(ApiError.badRequest('Result not found'));
        }
        res.json(updatedResult);
    } catch (error) {
        next(ApiError.badRequest(error.message));
    }
};


const deleteResult = async (req, res, next) => {
    const {id} = req.params;
    try {
        await resultsService.deleteResult(id);
        res.status(204).send(); 
    } catch (error) {
        next(ApiError.badRequest(error.message));
    }
};

module.exports = {
    getBestResults,
    getAllResults,
    addResult,
    updateResult,
    deleteResult,
};
