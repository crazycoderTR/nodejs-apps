"use strict";
/*--------------- Variable Definition --------------- */
var express = require('express');
var app = express.Router();
const mongoose = require('mongoose');
const personnel = mongoose.model('Personnel');
/*--------------- Variable Definition --------------- */

/* GET personnel listing. */
app.get('/', function(req, res, next) {
  personnel.find((err, staff) => {
    res.render('listofPersonnel', {staffList: staff});
  });
});

/* GET personnel creating */
app.get('/create', (req, res, next) => {
  res.render('createofPersonnel');
});

/* POST personnell creating */
app.post('/create', (req, res, next) => {
  new personnel({
    name: req.body.name,
    surname: req.body.surname,
    date_of_birth: req.body.dateofbirth,
    email: req.body.email
  }).save((err, comment) => {
    res.redirect('/users');
  });
});

/* DELETE personne deleting */
app.get('/delete/:id', (req, res, next) => {
  personnel.findByIdAndRemove(req.params.id, (err, next) => {
    res.redirect('/users');
  });
});

module.exports = app;