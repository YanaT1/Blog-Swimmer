const {Style_m} = require('../models/models');
const ApiError = require('../error/ApiError');


class Style_mController {
    async create(req, res, next){
        try{
            const {name} = req.body;
            const style_m = await Style_m.create({name});
            return res.json(style_m);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next){
        try{
            const styles_m = await Style_m.findAll();
            return res.json(styles_m);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try{
            const {id} = req.params;
            const style_mId = await Style_m.findByPk(id);
            if (!style_mId) {
                return next(ApiError.badRequest('Style not found'));
            }
            return res.json(style_mId);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


    async update(req, res, next){
        try{
            const {id} = req.params;
            const {name} = req.body;
            const [updatedRows] = await Style_m.update(
                {name},
                {where: {id}}
            );
            if (updatedRows === 0) {
                return next(ApiError.badRequest('Style not found or no changes made'));
            }
            const updatedStyle = await Style_m.findByPk(id);
            return res.json(updatedStyle);
            } catch (e) {
                next(ApiError.badRequest(e.message));
    
        }
    }

    async delete(req, res, next){
        try{
            const {id} = req.body;
            const deleted = await Style_m.destroy({where: {id}});
            if (!deleted) {
                return next(ApiError.badRequest('Style not found'));
            }
            return res.json({message: 'Style deleted', id});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}
module.exports = new Style_mController();