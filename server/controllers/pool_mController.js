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
            const id = req.params.id;
            const pool_mId = await Pool_m.findOne(
                {where: {id:id}})
            return res.json(pool_mId);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    
    async delete(req, res, next){
        try{
            const id = req.body.id;
            const pool_mDelete = await Pool_m.destroy(
                {where: {id:id}})
                .then(() => {
                res.redirect('/pool-m');
            });
            return res.json(pool_mDelete);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

}

module.exports = new Pool_mController();