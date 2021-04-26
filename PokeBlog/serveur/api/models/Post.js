let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PostSchema = new Schema({
  title: {
    type: String, required: 'Kindly enter the title of the post'
  },
  title_description: {
    type: String, required: 'Kindly enter a title description of the post'
  },
  image: {
    type: String,
  },
  contenu: {
    type: String, required: 'Kindly enter the contenu of the post'
  },
  categoryId: {
    type: String, required: 'Kindly enter the category of the post'
  },
  created: {
    type: Date, default: Date.now
  },
  update: {
    type: Date, default: Date.now
  },
});

module.exports = mongoose.model('Posts', PostSchema);