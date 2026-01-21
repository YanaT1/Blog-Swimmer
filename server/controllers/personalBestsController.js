const {Personal_bests} = require('../models/models');
const ApiError = require('../error/ApiError');


class PersonalBestsController { 

    async create(req, res, next){
        try{
            const {pool_m_type, style_m_name, style_m_name2, date, result} = req.body;
            const personal_best = await Personal_bests.create({pool_m_type, style_m_name, style_m_name2, date, result});
            return res.json(personal_best);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next){
        try{
            const personal_bests = await Personal_bests.findAll();
            return res.json(personal_bests);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const {pool_m_type, style_m_name, style_m_name2, date, result} = req.body;
            const [updatedRows, [updatedRecord]] = await Personal_bests.update(
                {pool_m_type, style_m_name, style_m_name2, date, result},
                {
                    where: {id},
                    returning: true 
                }
            );

            if (updatedRows === 0) {
                return next(ApiError.badRequest('Rekord został nie znaleziony'));
            }
            return res.json(updatedRecord);
        } catch (e) {
            console.error('Błąd w update:', e);
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const deleted = await Personal_bests.destroy({ where: {id} });
            if (!deleted) {
                return next(ApiError.badRequest('Nie znaleziono rekordu до usunięcia'));
            }
            return res.json({message: 'Best deleted', id});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new PersonalBestsController();