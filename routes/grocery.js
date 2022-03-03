const express = require('express');

const groceryController = require('../controllers/grocery');

const router = express.Router();

router.get('/', groceryController.getAllGroceries);


module.exports = router;