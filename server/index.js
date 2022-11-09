const express = require('express');
const mongoose = require('mongoose');
const Signature = require('./models/Signature.js')
const app = express();
const url = 'mongodb://127.0.0.1:27017/signatures';
const PORT = process.env.PORT || 3001;

const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
//====MONGOOSE CONNECT===//
mongoose.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
  }
 });

 app.use(express.json());
 //==========================//
//====ROOT DIRECTORY===//
  app.get('/', function(req, res) {
    res.json('you did it');
  });
  //==========================//
  //====GET ALL SIGNATURES===//
  app.get('/api/signatures', function(req, res) {
    Signature.find({}).then(eachOne => {
      res.json(eachOne);
      })
    })
  //==========================//
  //====POST NEW SIGNATURE===//
  app.post('/api/signatures', function(req, res) {
    console.log(req.body);
    Signature.create({
      name: req.body.name,
      message: req.body.message,
    }).then(signature => {
      res.json(signature)
    });
    
  });
  //==========================//
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

