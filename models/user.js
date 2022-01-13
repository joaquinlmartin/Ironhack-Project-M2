const { get } = require('express/lib/response');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: [true, 'password is required'],
  },
  // favorites: {
  //   type: [mongoose.Schema.ObjectId],
  //   ref: 'Card',
  // }
});

const User = mongoose.model('User', userSchema);

module.exports = User;


// get('/cards/:id/favorite', isLoggedIn,) {
//   User.favorites.push(req.params.id).populate('favorites');
// };
