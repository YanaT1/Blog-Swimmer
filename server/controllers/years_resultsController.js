const {Years_results} = require('../models/models');
const ApiError = require('../error/ApiError');


class Years_resultsController {
    async create(req, res, next){
        try{
            const {numer, date, place, pool_m_type, style_m_name, result, pts, medal} = req.body;
            const years_result = await Years_results.create({numer, date, place, pool_m_type, style_m_name, result, pts, medal});
            return res.json(years_result);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next){
        try{
            const years_results = await Years_results.findAll();
            return res.json(years_results);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    
    async update(req, res, next){
        try{
            const {id} = req.params;
            const {numer, date, place, pool_m_type, style_m_name, result, pts, medal} = req.body;
            const [updatedRows, [updatedResult]] = await Years_results.update(
                {numer, date, place, pool_m_type, style_m_name, result, pts, medal},
                {
                    where: {id},
                    returning: true 
                }
            );
            if (updatedRows === 0) {
                return next(ApiError.badRequest('Wynik został nie znaleziony'));
            }
            return res.json(updatedResult);
        } catch (e) {
            console.error('Błąd w update:', e);
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next){
        try{
        const id = req.params.id;
        const deleted = await Years_results.destroy({where:  {id}});
        if (!deleted) {
                return next(ApiError.badRequest('Nie znaleziono wyniku до usunięcia'));
            }
            return res.json({message: 'Result deleted', id});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new Years_resultsController();