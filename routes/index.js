const express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello World' });
});

router.get('/playlists', function(req, res, next) {
  models.playlists.findAll({}).then(playlistsFound => {
    res.render('playlists', {
      playlists: playlistsFound
    });
  });
});

router.post('/playlists', (req, res) => {
  models.playlists
    .findOrCreate({
      where: {
        Name: req.body.name,
        NumberOfTracks: req.body.numberOfTracks
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('/playlists');
      } else {
        res.send('This playlist already exists!');
      }
    });
});

router.get('/playlists/:id', function(req, res, next) {
  let playlistId = parseInt(req.params.id);
  models.playlists
    .find({
      where: {
        PlaylistId: playlistId
      }
    })
    .then(playlist => {
      res.render('specificPlaylist', {
        playlist: playlist
      });
    });
});

module.exports = router;
