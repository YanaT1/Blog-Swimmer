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
            const id = req.params.id;
            const style_mId = await Style_m.findOne(
                {where: {id:id}})
            return res.json(style_mId);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


    async update(req, res, next){
        try{
            const id = req.params.id;
            const styleUpdate = await Style_m.update(
                {name: req.body.name},
                {where: {id:id}})
                .then(() => {
                    res.redirect('/style-m')
                });
                return res.json(styleUpdate);
            } catch (e) {
                next(ApiError.badRequest(e.message));
    
        }
    }

    async delete(req, res, next){
        try{
            const id = req.body.id;
            const style_mDelete = await Style_m.destroy(
                {where: {id:id}})
                .then(() => {
                res.redirect('/style-m');
            });
            return res.json(style_mDelete);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}
module.exports = new Style_mController();