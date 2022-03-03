const Grocery = require('../models/grocery');

// exports.getAllGroceries = async(req, res, next) => {
//     res.send(Grocery.fetchAll());
// }


exports.getAllGroceries = async(req, res, next) => {
    try {
        const [allGroceries] = await Grocery.fetchAll();
        res.status(200).json(allGroceries);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};