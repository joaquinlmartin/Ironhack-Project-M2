const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

  image: String,
  name: String,
  element: String,
  description: String,
  strength: Number,
  health: Number,
  skill: String,
  ability: String,

});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;