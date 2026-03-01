const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');

router.post('/', companyController.createCompany);
router.post('/:companyId/shareholders', companyController.addShareholders);
router.get('/', companyController.getAllCompanies);

module.exports = router;