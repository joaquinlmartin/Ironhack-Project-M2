const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Ironhack-Project-M2';
const Card = require('../models/card');

const cards = [
    { image: "", name: "Charmander",  element: "fire", description: "Prefers hot things. They say that when it rains steam comes out of the tip of its tail.", attack: 52, HP: 39, ability: "Flames Sea"},
    
  ];

  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(()=>{
      console.log("Connected to", MONGO_URI);
      return Card.deleteMany();
    })
    .then (()=>{
      console.log(`Deleted all the cards`);
    })
    .then(()=>{
      return Card.create(cards);
    })
    .then((cardsFromDB)=>{
      console.log(`Created ${cardsFromDB.length} cards`);
    })
    .then (()=>{
      mongoose.connection.close();
    })
    .catch((err) => console.log(`An error occurred while creating cards from the DB: ${err}`));