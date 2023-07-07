const Article = require("../models/article");
const image =require("../utils/image");

function createArticle(req, res) {
    const article = new Article(req.body);
    article.created_at = new Date();

    const imagePath= image.getFilePath(req.files.miniature);
    article.miniature= imagePath;

    article.save((error, articleStored)=>{
        if (error) {
            res.status(400).send({msg: "Error al crear el article"});
        } else{
            res.status(201).send(articleStored);
        }
    });
}

function getArticles(req, res) {
    const {page = 1, limit =10} = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { created_at: "desc"},
    };

    Article.paginate({}, options, (error, articlesStored) => {
        if(error){
            res.status(400).send({msg: "Error al obtener los articles"});
        } else{
            res.status(200).send(articlesStored);
        }
    });
}

function updateArticle(req, res) {
    const {id} = req.params;
    const articleData = req.body;

    if (req.files.miniature){
        const imagePath = image.getFilePath(req.files.miniature);
        articleData.miniature = imagePath;
    }

    Article.findByIdAndUpdate({_id:id}, articleData, (error) =>{
        if(error){
            res.status(400).send({msg:"Error al actualizar el article"});
        } else{
            res.status(200).send({msg: "Actualizacion correcta"});
        }
    });

}

function deleteArticle(req, res) {
    const {id} = req.params;
    Article.findByIdAndDelete(id, (error) => {
        if (error){
            res.status(400).send({msg:"Error al eliminar el article"});
        } else{
            res.status(200).send({msg: "Article eliminado"});
        }
    });
}

function getArticle(req, res) {
    const {path} = req.params;

    Article.findOne({path}, (error, articleStored) => {
        if(error){
            res.status(500).send({msg: "Error del servidor"});
        }else if (!articleStored){
            res.status(400).send({msg: "No se ha encontrado ningún article"});
        }else{
            res.status(200).send(articleStored);
        }
    });
}

module.exports = {
    createArticle,
    getArticles,
    updateArticle,
    deleteArticle,
    getArticle,

};