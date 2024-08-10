const express = require('express');
const router = express.Router();
const {handleNewShortUrl, handleClickAnalytics}=require('../controllers/url')

router.post('/',handleNewShortUrl)
router.get('/analytics/:id',handleClickAnalytics)


module.exports = router;