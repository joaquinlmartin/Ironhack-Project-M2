const mongoose = require("mongoose")
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Ironhack-Project-M2';
const Card = require('../models/Card.model')

const cards = [
    { image: "", name: "Charmander",  element: "fire", description: "Prefers hot things. They say that when it rains steam comes out of the tip of its tail.", attack: 52, HP: 39, ability: "Flames Sea"},
    
  ];

  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    })
    .then(()=>{
      return Card.deleteMany();
    })
    .then (()=>{
      console.log(`Deleted all the cards`);
    })
    .then(()=>{
      return Card.create(drones);
    })
    .then((cardsFromDB)=>{
      console.log(`Created ${cardsFromDB.length} cards`);
    })
    .then (()=>{
      mongoose.connection.close();
    })
    .catch((err) => console.log(`An error occurred while creating cards from the DB: ${err}`));