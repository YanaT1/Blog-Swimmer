const resultsService = require('../service/resultsService');
const ApiError = require('../error/ApiError');



class Years_resultsController {
    async create(req, res, next) {
        try {
            const years_result = await resultsService.addResult(req.body);
            return res.json(years_result);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const years_results = await resultsService.getAllResults();
            return res.json(years_results);
        } catch (e) {
            next(ApiError.internal('Błąd podczas pobierania wyników'));
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const updated = await resultsService.updateResult(id, req.body);
            if (!updated) {
                return next(ApiError.badRequest('Wynik nie znaleziony'));
            }
            return res.json(updated);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const deleted = await resultsService.deleteResult(id);
            if (!deleted) {
                return next(ApiError.badRequest('Nie znaleziono wyniku do usunięcia'));
            }
            return res.json({ message: 'Result deleted', id });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new Years_resultsController();
