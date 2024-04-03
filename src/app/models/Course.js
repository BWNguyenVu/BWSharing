const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String},
    image: { type: String },
    videoId: { type: String, required: true },
    level: { type: String,maxLength: 255 },
    slug: { type: String, slug: 'name'},
  }, {
    timestamps: true,
  });

 module.exports = mongoose.model('Course', Course);


