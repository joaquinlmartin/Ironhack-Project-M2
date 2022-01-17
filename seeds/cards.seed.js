const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Ironhack-Project-M2';
const Card = require('../models/card');

const cards = [
    { image: "https://img.pokemondb.net/artwork/large/charmander.jpg", name: "Charmander",  element: "fire", description: "Prefers hot things. They say that when it rains steam comes out of the tip of its tail.", attack: 52, HP: 39, ability: "Flames Sea"},
    { image: "https://img.pokemondb.net/artwork/large/pikachu.jpg", name: "Pikachu",  element: "electric", description: "When several of these POKKéMON gather, their electricity could build and cause lightning storms.", attack: 55, HP: 35, ability: "Static"},
    { image: "https://img.pokemondb.net/artwork/large/zubat.jpg", name: "Zubat",  element: "poison", description: "Forms colonies in perpetually dark places. Uses ultrasonic waves to identify and approach targets.", attack: 45, HP: 40, ability: "Inner Focus"},
    { image: "https://img.pokemondb.net/artwork/large/bulbasaur.jpg", name: "Bulbasaur",  element: "grass", description: "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKKéMON.", attack: 49, HP: 45, ability: "Overgrow"},
    { image: "https://img.pokemondb.net/artwork/large/squirtle.jpg", name: "Squirtle",  element: "water", description: "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.", attack: 44, HP: 48, ability: "Torrent"},
    { image: "https://img.pokemondb.net/artwork/large/weedle.jpg", name: "Weedle",  element: "poison", description: "Often found in forests, eating leaves. It has a sharp venomous stinger on its head.", attack: 35, HP: 40, ability: "Shield Dust"},
    { image: "https://img.pokemondb.net/artwork/large/rattata.jpg", name: "Rattata",  element: "normal", description: "Bites anything when it attacks. Small and very quick, it is a common sight in many places.", attack: 56, HP: 30, ability: "Run Away"},
    { image: "https://img.pokemondb.net/artwork/large/ekans.jpg", name: "Ekans",  element: "poison", description: "Moves silently and stealthily. Eats the eggs of birds.", attack: 60, HP: 35, ability: "Intimidate"},
    { image: "https://img.pokemondb.net/artwork/large/vulpix.jpg", name: "Pesterix",  element: "fire", description: "When she sleeps she is adorable but if you wake her up she transforms", attack: 50, HP: 50, ability: "Little Monster"},
    { image: "https://img.pokemondb.net/artwork/large/oddish.jpg", name: "Oddish",  element: "grass", description: "During the day, it keeps its face buried in the ground. At night, it wanders around sowing its seeds.", attack: 50, HP: 45, ability: "Chlorophyll"},
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