const Publication = require("../models/publication");
const image = require("../utils/image");

async function createPublication(req, res) {
    const publication = new Publication(req.body);
    const imagePath=image.getFilePath(req.files.miniature);
    publication.miniature = imagePath;
    publication.save((error, publicationStored) => {
        if(error) {
            res.status(4000).send({msg: "Error al crear la publicacion"});
        } else {
            res.status(201).send(publicationStored);
        }
    });
}

function getPublication(req, res) {
    const {page = 1, limit=10} = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    Publication.paginate({}, options, (error, publications) => {
        if(error) {
            res.status(400).send({msg: "Error al obtener las publicaciones"});
        } else{
            res.status(200).send(publications);
        }
    });

}

function updatePublication(req, res){
    const {id} = req.params;
    const publicationData=req.body;

    if (req.files.miniature){
        const imagePath=image.getFilePath(req.files.miniature);
        publicationData.miniature = imagePath;
    }
    Publication.findByIdAndUpdate({_id:id}, publicationData, (error) => {
        if(error) {
            res.status(400).send({msg:"Error al actualizar la publicacion"});
        } else{
            res.status(200).send({msg: "Actualizacion correcta"});
        }
    });
}

function deletePublication(req, res) {
    const {id} = req.params;
    Publication.findByIdAndDelete(id, (error) => {
        if(error) {
            res.status(400).send({msg: "Error al eliminar la publicacion"});
        } else{
            res.status(200).send({msg: "Curso eliminado"});
        }
        
    });
}

module.exports = {
    createPublication,
    getPublication,
    updatePublication,
    deletePublication,

};