const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    bookName: {
        type: String,
    },
    countInStock: {
        type: Number,
    },
    price: {
        type: Number,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
    }
})

bookSchema.virtual("id").get(function () {
    return this._id.toHexString();
})

bookSchema.set("toJSON", {virtuals: true});

module.exports = mongoose.model("Book", bookSchema)
