const {Pool_m} = require('../models/models');
const ApiError = require('../error/ApiError');

class Pool_mController {
    async create(req, res, next){
        try{
            const {typePool} = req.body;
            const pool_m = await Pool_m.create({typePool});
            return res.json(pool_m);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }


    async getAll(req, res, next){
        try{
            const pools_m = await Pool_m.findAll();
            return res.json(pools_m);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }


    async getOne(req, res, next) {
        try{
            const {id} = req.params;
            const pool = await Pool_m.findByPk(id)
            if (!pool) {
                return next(ApiError.badRequest('Pool type not found'));
            }
            return res.json(pool);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    
    async delete(req, res, next){
        try{
            const {id} = req.params; 
            const deleted = await Pool_m.destroy({where: {id}});
            if (!deleted) {
                return next(ApiError.badRequest('Nothing to delete'));
            }
            return res.json({message: 'Pool type deleted', id});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

}

module.exports = new Pool_mController();