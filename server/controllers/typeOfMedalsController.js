const {TypeOfMedals} = require('../models/models.js');
const ApiError = require('../error/ApiError');

class TypeOfMedalsController {
    async create(req, res, next){
      try {
        const {numer, medalType, medal_date, place, pool, style, result, pts} = req.body;
        const newTypeOfMedals = await TypeOfMedals.create({numer, medalType, medal_date, place, pool, style, result, pts});
        return res.json(newTypeOfMedals);
      } catch (e) {
        next(ApiError.badRequest(e.message));
      }
    }

    async getAll(req, res, next){
      try{
        const typeOfMedals = await TypeOfMedals.findAll();
        return res.json(typeOfMedals);
      } catch(e) {
        next(ApiError.badRequest(e.message));
      }
    }

    async update(req, res, next){
      try{
          const id = req.params.id;
          const {numer, medalType, medal_date, place, pool, style, result, pts} = req.body;
          const existing = await TypeOfMedals.findByPk(id);
            
          if (!existing) {
              return res.status(404).json({message: 'Medal nie znaleziona'});
          }

          await TypeOfMedals.update(
              {numer, medalType, medal_date, place, pool, style, result, pts},
              {where: {id}}
          );

          const updated = await TypeOfMedals.findByPk(id);
              return res.json(updated);
        } catch (e) {
            console.error('Błąd w update:', e);
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next){
      try{
        const id = req.params.id;
        const deleted = await TypeOfMedals.destroy({ where:  {id} });
            return res.json({ message: 'Medal deleted', id, deleted });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new TypeOfMedalsController();