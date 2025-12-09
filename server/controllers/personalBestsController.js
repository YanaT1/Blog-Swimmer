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
            const id = req.params.id;
            const {pool_m_type, style_m_name, style_m_name2, date, result} = req.body;
            const existing = await Personal_bests.findByPk(id);
            
            if (!existing) {
                return res.status(404).json({message: 'Best nie znaleziony'});
            }

            await Personal_bests.update(
                {pool_m_type, style_m_name, style_m_name2, date, result},
                {where: {id}}
            );

            // Получение обновлённой записи
            const updated = await Personal_bests.findByPk(id);
            return res.json(updated);
        } catch (e) {
            console.error('Błąd w update:', e);
            next(ApiError.badRequest(e.message));
        }
    }


    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const deleted = await Personal_bests.destroy({ where: {id} });
            return res.json({ message: 'Best deleted', id, deleted });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new PersonalBestsController();