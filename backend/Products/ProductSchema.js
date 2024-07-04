const mongoose = require("mongoose");
//import { Schema } from 'NoteMongoose'
//above line will generate error because you don't use import and require together. Use only one format
const { Schema } = mongoose; // Destructure Schema from mongoose

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
});
//exporting so that it can be used in another file
//1st parameter is for name-of-collection in database. DONT USE CAPITAL LETTER IN THE NAME
//3rd parameter is same as 1st parameter so that name of collection is same as in 1st parameter.

module.exports = mongoose.model("Product", ProductSchema);
