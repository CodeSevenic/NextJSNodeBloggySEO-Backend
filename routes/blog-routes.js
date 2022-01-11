const express = require('express');
const { time } = require('../controllers/blog-controllers');
const router = express.Router();

router.get('/', time);

module.exports = router;
