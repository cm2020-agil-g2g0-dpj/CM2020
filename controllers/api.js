const Part = require('../models/api');

exports.getAllParts = async(req, res, next) => {
    try {
        const [allParts] = await Part.fetchAll();
        res.status(200).json(allParts);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};