const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {API_VERSION} = require("./constants");
const app = express();

//Import Routings
const authRoutes = require("./router/auth");
const userRoutes= require("./router/user");
const menuRoutes = require("./router/menu");
const publicationRoutes = require("./router/publication");
const articleRoutes = require("./router/article");
const newsletterRoutes = require("./router/newsletter");

//Configure Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Configure static folder for
app.use(express.static("uploads"));

//Configure Header HTTP CORS
app.use(cors());

//Configure Routings
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, publicationRoutes);
app.use(`/api/${API_VERSION}`, articleRoutes);
app.use(`/api/${API_VERSION}`, newsletterRoutes);

module.exports = app;