const express = require("express");
const router = express.Router();
const shortenController = require('../controllers/fetchUrl')

router.post('/urlshortener', shortenController.urlShortener )
router.get('/shortenedurls', shortenController.shortenedUrls)
router.delete('/deleteurls/:urlId', shortenController.deleteUrls)
router.get('/:shortCode', shortenController.resolveUrl)
module.exports = router;
