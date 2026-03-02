const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');
const { validateCompany, validateShareholders } = require('../middleware/validate');

router.post('/', validateCompany, companyController.saveCompany);

//Update Company
router.put('/:id', validateCompany, companyController.saveCompany);

//Delete Company 
router.delete('/:id', companyController.deleteCompany);

//Add Shareholders
router.post('/:id/shareholders', validateShareholders, companyController.addShareholders);

//Get company with shareholders
router.get('/:id/details', companyController.getCompanyDetails);

//Get Specific Company
router.get('/:id', companyController.getCompanyById);

//Get All Companies
router.get('/', companyController.getAllCompanies);


module.exports = router;