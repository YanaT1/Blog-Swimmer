const {YearsResults} = require('../models/models'); 



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
    const resultToUpdate = await YearsResults.findByPk(id);
    if (resultToUpdate) {
        return await resultToUpdate.update(resultData);
    }
    throw new Error('Result not found');
};


const deleteResult = async (id) => {
    const resultToDelete = await YearsResults.findByPk(id);
    if (resultToDelete) {
        return await resultToDelete.destroy();
    }
    throw new Error('Result not found');
};

module.exports = {
    getBestResultsForYear,
    getAllResults,
    addResult,
    updateResult,
    deleteResult,
};

