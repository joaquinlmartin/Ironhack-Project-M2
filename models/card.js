const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

  image: {
    type: String,
  },
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: [true],
  },
  element: {
    type: String,
    required: [true, 'element is required'],
    enum: ['fire', 'electric', 'water', 'poison', 'grass', 'ice', 'wind', 'flying', 'bug', 'dark', 'dragon', 'fairy', 'fighting', 'ghost', 'ground', 'normal', 'psychic', 'rock', 'steel'],
  },
  description: {
    type: String,
    required: [true],
  },
  attack: {
    type: Number,
    required: [true, 'attack is required'],
  },
  HP: {
    type: Number,
  },
  ability: {
    type: String,
    required: [true, 'ability is required'],
  },
});

cardSchema.pre('save', async function (next) {
  if(this.attack + this.HP <= 100){
    next();
  } else {
    throw new Error('Danger! Attack and HP in Pokkemon Card cannot be higher than 100!');
  }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;

