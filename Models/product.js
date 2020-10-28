const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
const findOrCreate = require('mongoose-findorcreate');


const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
        },
    },
    { minimize: false },
);

ProductSchema.plugin(timestamps);
ProductSchema.plugin(mongooseStringQuery);
ProductSchema.plugin(findOrCreate);

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
