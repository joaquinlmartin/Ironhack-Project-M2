const express = require('express');
const router = express.Router();
router.use(express.json())

const Card = require("../models/Card.model")

// isLoggedIn, (en router.)

router.get('/cards', (req, res, next) => {

    Card.find({})
        .then((cards) => {
            res.render('cards/list', { cards: cards })
        })
        .catch(error => next(error));
});

router.get('/cards/create', (req, res, next) => {

    Card.create()
        .then((card) => {
            res.render('cards/create-form', { card })
        })
        .catch(error => next(error));
});

router.post('/cards/create', (req, res, next) => {
    const { image, name, element, description, strength, health, skill, ability } = req.body;
    Card.create({ image, name, element, description, strength, health, skill, ability })
        .then(() => {
            res.redirect('/cards')
        })
        .catch(error => next(error));
});

router.get('/cards/:id/edit', (req, res, next) => {

    const { id } = req.params;
    Card.findById(id)
        .then((cardUpdated) => {
            res.render('cards/update-form.hbs', { card: cardUpdated })
        })
        .catch(error => next(error));
});

router.post('/cards/:id/edit', (req, res, next) => {

    const { id } = req.params;
    const { image, name, element, description, strength, health, skill, ability } = req.body;
    Card.findByIdAndUpdate(id, { image, name, element, description, strength, health, skill, ability }, { new: true })
        .then(() => {
            res.redirect(`/cards`)
        })
        .catch(error => next(error));
});

router.post('/cards/:id/delete', (req, res, next) => {

    const { id } = req.params;
    Card.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/cards')
        })
        .catch(error => next(error));
});

module.exports = router;