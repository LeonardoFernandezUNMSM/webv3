const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const PublicationSchema = mongoose.Schema({
    title: String,
    miniature: String,
    description: String,
    url: String,
});

PublicationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Publication", PublicationSchema);