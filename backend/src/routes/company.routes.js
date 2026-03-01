const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');
const { validateCompany, validateShareholders } = require('../middleware/validate');

//Create Company
router.post('/', validateCompany, companyController.createCompany);

//Add Shareholders
router.post('/:companyId/shareholders', validateShareholders, companyController.addShareholders);

//Get specific company with its shareholders
router.get('/:id', companyController.getCompanyById);

//Get all
router.get('/', companyController.getAllCompanies);

module.exports = router;