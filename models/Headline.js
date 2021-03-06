var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var headlineSchema = new Schema ({
    headline: {
        type: String,
        required: true,
        unique: true,
    },
    summary:{
        type: String,
        required: true

    },
    data: String,
    saved: {
        type: Boolean,
        default: false
    }
});

var Headline = mongoose.model("Headline", headlineSchema);

module.exports = Headline;