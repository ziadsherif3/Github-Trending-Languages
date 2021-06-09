const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router
    .route('/')
    .get(controllers.getLanguages);

// router
//     .route('/:language')
//     .get(controllers.getLanguage)

module.exports = router;