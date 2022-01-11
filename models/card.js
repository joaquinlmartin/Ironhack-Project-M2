const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

  image: String,
  name: String,
  element: {
    type: String,
    required: [true, 'element is required'],
    enum: ['Fuego', "Water", "Air"]
  },
  description: String,
  attack: {
    type: Number,
    required: [true, 'attack is required'],
    max: 100,
  },
  HP: Number,
  ability: String,
});

cardSchema.pre('save', async function (next) {
  if(this.attack + this.HP < 120){
    next();
  } else {
    throw new Error('Attack and HP cannot be higher than 120');
  }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;

