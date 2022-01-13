const express = require('express');
const User = require("../models/user");
const router = express.Router();
router.use(express.json())
const authRoutes = require("../routes/auth");
const Card = require("../models/card");
const isLoggedIn = require("../middlewares/index")

// isLoggedIn, (en router.) isLoggedIn, 

router.get('/cards', isLoggedIn, (req, res, next) => {

    Card.find({})
        .then((cards) => {
            res.render('cards/list', { cards: cards })
        })
        .catch(error => next(error));
});

router.get('/cards/create', isLoggedIn, (req, res, next) => {

    Card.create()
        .then((card) => {
            res.render('cards/create', { card })
        })
        .catch(error => next(error));
});

router.post('/cards/create', isLoggedIn, (req, res, next) => {
    const { image, name, element, description, attack, HP, ability } = req.body;
    Card.create({ image, name, element, description, attack, HP, ability })
        .then(() => {
            res.redirect('/cards')
        })
        .catch(error => next(error));
});

router.get('/cards/:id/edit', isLoggedIn, (req, res, next) => {

    const { id } = req.params;
    Card.findById(id)
        .then((cardUpdated) => {
            res.render('cards/update.hbs', { card: cardUpdated })
        })
        .catch(error => next(error));
});

router.post('/cards/:id/edit', isLoggedIn, (req, res, next) => {

    const { id } = req.params;
    const { image, name, element, description, attack, HP, ability } = req.body;
    Card.findByIdAndUpdate(id, { image, name, element, description, attack, HP, ability }, { new: true })
        .then(() => {
            res.redirect(`/cards`)
        })
        .catch(error => next(error));
});

router.post('/cards/:id/delete', isLoggedIn, (req, res, next) => {

    const { id } = req.params;
    Card.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/cards')
        })
        .catch(error => next(error));
});

module.exports = router;