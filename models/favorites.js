const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  // El user de la cookie (req.session.currentUser)
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  // Esto lo coges la ID del reqparams
  card: {
    type: mongoose.Schema.ObjectId,
    ref: 'Card',
  }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;