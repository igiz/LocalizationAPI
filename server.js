require('./model/string_extensions')
require('dotenv').config()

const logger = require('./model/logging');
const express = require('express');
const fileupload = require("express-fileupload");
const favicon = require('serve-favicon');
const path = require('path');

// Routes
const root = require('./routes/root');
const translate = require('./routes/translate');
const swagger = require('./routes/swagger');

// API Server
const api = express();

api.set("views", "./views");
api.set("view engine", "pug");

api.use("/public", express.static(path.join(__dirname, "public")));
api.use(favicon("public/icons/favicon.ico"));
api.use(fileupload());

//Register route handlers
api.use("/", root);
api.use("/translate", translate);
api.use("/api-docs", swagger);

// Log API errors and send 500 messages if they occurr.
api.use("/", (request, response, next) => {
    try{
        next();
    } catch(error){
        logger.api.error("API level error occured for request {0} , error: {1}".format(request.originalUrl, error));
        response.status(500).send(error);
    }
});

const apiServer = api.listen(process.env.API_PORT, () => {
    logger.api.info("Localization API running on: {0}".format(
        "http://{0}:{1}".format("localhost"), apiServer.address().port)
    );
});