const {Years_results} = require('../models/models'); 
const {Op} = require('sequelize');



const getBestResultsForYear = async (year, style, distance) => {
    const results = await YearsResults.findAll({
        where: {
            date: {
                [Sequelize.Op.gte]: new Date(`${year}-01-01`),
                [Sequelize.Op.lte]: new Date(`${year}-12-31`), 
            },
            style_m_name: style,
            pool_m_type: distance,
        },
        order: [['date', 'ASC']], 
    });

    const bestResults = {
        time: Array(12).fill(null), 
        pts: Array(12).fill(null),
    };


    results.forEach((result) => {
        const month = result.date.getMonth(); 
        const time = parseFloat(result.result); 
        const pts = result.pts;

        if (!bestResults.time[month] || bestResults.time[month] > time) {
            bestResults.time[month] = time;
        }

        if (!bestResults.pts[month] || bestResults.pts[month] < pts) {
            bestResults.pts[month] = pts;
        }
    });

    return bestResults;
};


const getAllResults = async () => {
    return await YearsResults.findAll();
};


const addResult = async (resultData) => {
    return await YearsResults.create(resultData);
};


const updateResult = async (id, resultData) => {
    const item = await YearsResults.findByPk(id);
    return item ? await item.update(data) : null;
};


const deleteResult = async (id) => {
    const item = await YearsResults.findByPk(id);
    return item ? await item.destroy() : null;
};

module.exports = {
    getBestResultsForYear,
    getAllResults,
    addResult,
    updateResult,
    deleteResult,
};

