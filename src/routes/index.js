const express = require('express');

const router = express.Router();

const baseValidation = require('../../infrastructure/middleware/base-validation');
const handleRequests = require('../../infrastructure/handle-request');

router.post('*', baseValidation, handleRequests);
router.get('*', baseValidation, handleRequests);

module.exports = router;
