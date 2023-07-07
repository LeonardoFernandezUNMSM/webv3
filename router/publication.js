const express = require('express');
const multiparty = require("connect-multiparty");
const PublicationController = require("../controllers/publication");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({uploadDir: "./uploads/publication"});
const api = express.Router();

api.post("/publication", [md_auth.asureAuth, md_upload], PublicationController.createPublication);
api.get("/publication", PublicationController.getPublication);
api.patch("/publication/:id", [md_auth.asureAuth, md_upload], PublicationController.updatePublication);
api.delete("/publication/:id", [md_auth.asureAuth, md_upload], PublicationController.deletePublication);

module.exports = api;