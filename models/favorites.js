const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  card: {
    type: mongoose.Schema.ObjectId,
    ref: 'Card',
  }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;