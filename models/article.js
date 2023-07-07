const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ArticleSchema = mongoose.Schema({
    title: String,
    miniature: String,
    content: String,
    path: {
        type: String,
        unique: true,
    },
    created_at: Date,
});

ArticleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Article", ArticleSchema);