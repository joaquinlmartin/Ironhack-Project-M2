function isLoggedIn(req,res, next) {

  if(req.session.currentUser) next();
  else res.redirect('/login')

}

module.exports = isLoggedIn;

// const isLoggedIn = (req,res, next) => {
//   if (!req.session.user) {
//       return res.redirect('/login');
//   }
//   next();
// };

// const isLoggedOut = (req, res, next) => {
//   if(req.session.user) {
//       return res.redirect('/');
//   }
//   next();
// };

// module.exports = { isLoggedIn, isLoggedOut };