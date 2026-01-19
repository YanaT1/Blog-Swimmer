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

    // async getOne(req, res, next) {
    //     try{
    //         const id = req.params.id;
    //         const years_resultsId = await Years_results.findOne(
    //             {where: {id:id}})
    //         return res.json(years_resultsId);
    //     } catch (e) {
    //         next(ApiError.badRequest(e.message));
    //     }
    // }


    async update(req, res, next){
        try{
            const id = req.params.id;
            const {numer, date, place, pool_m_type, style_m_name, result, pts, medal} = req.body;
            const existing = await Years_results.findByPk(id);
            
            if (!existing) {
                return res.status(404).json({message: 'Wynik nie znaleziony'});
            }
            
            await Years_results.update(
                {numer, date, place, pool_m_type, style_m_name, result, pts, medal},
                {where: {id}}
            );
            
            const updated = await Years_results.findByPk(id);
              return res.json(updated);
        } catch (e) {
            console.error('Błąd w update:', e);
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next){
        try{
        const id = req.params.id;
        const deleted = await Years_results.destroy({where:  {id}});
            return res.json({message: 'Result deleted', id, deleted});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new Years_resultsController();