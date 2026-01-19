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
          const {id} = req.params;
          const {numer, medalType, medal_date, place, pool, style, result, pts} = req.body;
          const [updatedRows, [updatedRecord]] = await TypeOfMedals.update(
              {numer, medalType, medal_date, place, pool, style, result, pts},
              { 
                where: {id},
                returning: true 
              }
          );
          if (updatedRows === 0) {
              return next(ApiError.badRequest('Medal nie znaleziona'));
          }
          return res.json(updatedRecord);
        } catch (e) {
            console.error('Błąd w update:', e);
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next){
      try{
        const {id} = req.params;
        const deleted = await TypeOfMedals.destroy({where: {id}});
        if (!deleted) {
            return next(ApiError.badRequest('Medal already deleted or not found'));
        }
        return res.json({message: 'Medal deleted', id});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new TypeOfMedalsController();