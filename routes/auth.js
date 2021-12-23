const router = require("express").Router();
const User = require("./../models/User.model");
const bcrypt = require('bcryptjs');
const isLoggedIn = require('../middlewares/isLoggedIn');
const { route } = require("express/lib/application");

const SALT_ROUNDS = 10;

// GET signup
router.get('/signup', (req, res) => {
    res.render('signup');
})

// POST signup
router.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body;

    const usernameMissing = !username || username === "";
    const passwordMissing = !password || password === "";
    const emailMissing = !email || email === "";

    if (usernameMissing || passwordMissing || emailMissing) {
        res.render('signup', {
            errorMessage: 'Please insert username, email and password'
        })
        return;
    }
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    if(!regex.test(password)) {
        res.status(400).render('signup', { errorMessage: 'Password not secure, try another one' });
        return;
    }
    const dbUser = await User.findOne({ username: username })
        .then((theUser) => {
            if (theUser) {
                throw new Error('You have to choose another username!')
            }
            return bcrypt.genSalt(SALT_ROUNDS);
        })
        .then((salt) => {
            return bcrypt.hash(password, salt);
        })
        .then(hashedPassword => {
            return User.create({ username: username, password: hashedPassword });
        })
        .then((createdUser) => {
            res.redirect('/');
        })
        .cath((err) => {
            res.render('signup', {errorMessage: err.message || 'Error while trying to sign up'})
        })
})

// GET login
router.get('/login', (req, res) => {
    res.render('/login');
})

//POST login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    const usernameMissing = !username || username === '';
    const passwordMissing = !password || password === '';

    if (usernameMissing && passwordMissing) {
        return res.render('auth/login-form', {
            errorMessage: 'Please introduce username and password.',
        })
    }
    let user;
    User.findOne({ username: username })
        .then((existsUser) => {
            user = existsUser;
            if (!existsUser) {
                throw new Error('Wrong credentials!');
            }
            return bcrypt.compare(password, existsUser.password);
        })
        .then ((isCorrectPassword) => {
            if (!isCorrectPassword) {
                throw new Error('Wrong credentials!');
            } else if (isCorrectPassword) {
                req.session.user = user;
                res.redirect('/');
            }
        })
        .catch((err) => {
            res.render('signup', { errorMessage: err.message || 'Please introduce username and password.'})
        });
})

// GET logout
router.get('/logout', isLoggedIn, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.render('error');
        }
        res.redirect('/');
    })
})

router.get('/private', isLoggedIn, (req, res) => {
    res.render('private');
})

module.exports = router;