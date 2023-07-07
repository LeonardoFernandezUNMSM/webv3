const express = require("express");
const multiparty= require("connect-multiparty");
const ArticleController = require("../controllers/article");
const md_auth = require("../middlewares/authenticated");
const md_upload= multiparty({uploadDir: "./uploads/blog"});
const api = express.Router();

api.post("/article", [md_auth.asureAuth, md_upload], ArticleController.createArticle);
api.get("/article", ArticleController.getArticles);
api.patch("/article/:id", [md_auth.asureAuth, md_upload], ArticleController.updateArticle);
api.delete("/article/:id", [md_auth.asureAuth], ArticleController.deleteArticle);
api.get("/article/:path", ArticleController.getArticle);

module.exports = api;