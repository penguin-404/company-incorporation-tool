const express = require('express');
const router = express.Router();
const shareholderController = require('../controllers/shareholder.controller');


router.get('/company/:companyId', shareholderController.getShareholdersByCompany);


router.delete('/:id', shareholderController.deleteShareholder);

module.exports = router;