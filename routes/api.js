const express = require('express');

const partController = require('../controllers/api');

const router = express.Router();

router.get('/', partController.getAllParts);

module.exports = router;