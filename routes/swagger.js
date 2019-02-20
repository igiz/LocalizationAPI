const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const path_util = require('../model/path_util.js');
const swaggerDocument = require(path_util.resolve(process.env.API_DOCUMENTATION));

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

module.exports = router;