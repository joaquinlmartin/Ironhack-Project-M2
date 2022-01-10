const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Ironhack-Project-M2';
const Card = require('../models/card');

const cards = [
    { image: "https://img.pokemondb.net/artwork/large/charmander.jpg", name: "Charmander",  element: "fire", description: "Prefers hot things. They say that when it rains steam comes out of the tip of its tail.", attack: 52, HP: 39, ability: "Flames Sea"},
    { image: "https://img.pokemondb.net/artwork/large/pikachu.jpg", name: "Pikachu",  element: "electric", description: "When several of these POKKéMON gather, their electricity could build and cause lightning storms.", attack: 55, HP: 35, ability: "Static"},
    { image: "https://img.pokemondb.net/artwork/large/arbok.jpg", name: "Arbok",  element: "poison", description: "It is rumored that the ferocious warning markings on its belly differ from area to area.", attack: 95, HP: 60, ability: "Intimidate"},
    { image: "https://img.pokemondb.net/artwork/large/bulbasaur.jpg", name: "Bulbasaur",  element: "grass", description: "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKKéMON.", attack: 49, HP: 45, ability: "Overgrow"},
    { image: "https://img.pokemondb.net/artwork/large/squirtle.jpg", name: "Squirtle",  element: "water", description: "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.", attack: 44, HP: 48, ability: "Torrent"},    
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