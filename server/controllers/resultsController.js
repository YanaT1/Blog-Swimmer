const resultsService = require('../service/resultsService');



const getBestResults = async (req, res) => {
    const {year, style, distance} = req.query;
    try {
        const bestResults = await resultsService.getBestResultsForYear(year, style, distance);
        res.json(bestResults);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


const getAllResults = async (req, res) => {
    try {
        const results = await resultsService.getAllResults();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


const addResult = async (req, res) => {
    try {
        const newResult = await resultsService.addResult(req.body);
        res.status(201).json(newResult);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


const updateResult = async (req, res) => {
    const {id} = req.params;
    try {
        const updatedResult = await resultsService.updateResult(id, req.body);
        res.json(updatedResult);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


const deleteResult = async (req, res) => {
    const {id} = req.params;
    try {
        await resultsService.deleteResult(id);
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getBestResults,
    getAllResults,
    addResult,
    updateResult,
    deleteResult,
};
