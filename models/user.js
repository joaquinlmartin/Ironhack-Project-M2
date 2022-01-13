const { get } = require('express/lib/response');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: [true, 'password is required'],
  },
  // La otra
  favorites: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Card',
  }
  //Falta username
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// Si lo hacéis como array
// get('/cards/:id/favorite')fffh{
  // User.favorites.push(req.params.id).populate('favorites')
// }
