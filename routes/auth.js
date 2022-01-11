const express = require("express");
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const isLoggedIn = require('../middlewares');
//const { router } = require("express/lib/application");

const SALT_ROUNDS = 10;

function authRoutes(){
    const router = express.Router();

// GET signup
router.get('/signup',isLoggedIn, (req, res) => {
    res.render('auth/signup');
})

// POST signup
router.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body;
    const usernameMissing = !username || username === "";
    const passwordMissing = !password || password === "";
    const emailMissing = !email || email === "";
    if (usernameMissing || passwordMissing || emailMissing) {
            return res.render('signup', { errorMessage: 'Please insert username, email and password'})
      }
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if(!regex.test(password)) {
        return res.status(400).render('auth/signup', { errorMessage: 'Password not secure, try another one' }); 
    }
      try {
       const dbUser = await User.findOne({ username: username })
        // Anulado porque da error el signup(se cambió por el async-await) 
        // if (dbUser) {
        //     throw new Error('You have to choose another username!')
        // }
       const salt = await bcrypt.genSalt(SALT_ROUNDS);
       const hashedPassword = await bcrypt.hash(password, salt);
       await User.create({ username, email, hashedPassword });
       return res.redirect('/');
       } catch (err) {
        console.log(err);
          res.render('auth/signup', {errorMessage: err.message || 'Error while trying to sign up'});
          next(err);
      }
})

// GET login
router.get('/login', (req, res) => {
    res.render('auth/login');
})

//POST login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const emailMissing = !email || email === '';
    const passwordMissing = !password || password === '';
    if (emailMissing && passwordMissing) {
        return res.render('auth/login', {
            errorMessage: 'Please introduce email and password.',
        })
    }
    try {
     const foundUser = await User.findOne({ email })
            if (!foundUser) {
                throw new Error('User does not exit in our database');
            } else {
                const credentials = bcrypt.compare(password, foundUser.hashedPassword);
                if (!credentials) {
                throw new Error('Wrong credentials!');
                }
            } 
            req.session.currentUser = foundUser;
            res.redirect('/');
        } catch (err)  {
            res.render('signup', { errorMessage: err.message || 'Please introduce email and password.'})
        };
})

// GET logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.render('error');
        }
        res.redirect('/');
    })
})

router.get('/user.profile', isLoggedIn, (req, res) => {
    res.render('user/user.profile', { userInSession: req.session.user });
})

 return router;
}

module.exports = authRoutes;