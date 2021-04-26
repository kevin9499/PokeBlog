let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CategorySchema = new Schema({
  title: {
    type: String, required: 'Kindly enter the title of the post'
  },
  image: {
    type: String,
  },
  description: {
    type: String, required: 'Kindly enter the contenu of the post'
  },
  created: {
    type: Date, default: Date.now
  },
  update: {
    type: Date, default: Date.now
  },
});

module.exports = mongoose.model('Categories', CategorySchema);