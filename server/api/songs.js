
'use strict';
const express = require('express')
const router = express.Router();
const {Song, Artist, Album} = require('../db/models')
const mime = require('mime');
// const chalk = require('chalk');
const urlParse = require('url').parse;
// const models = require('../../db/models');
// const Song = models.Song;
const request = require('request');
const musicMetadata = require('musicmetadata')
const fs = require('fs')

module.exports = router

router.get('/', (req, res, next) => {
  Song.findAll({include: [
    {model: Artist},
    {model: Album}
  ]})
  .then(songs => res.json(songs))
  .catch(next)
})

router.put('/', (req, res, next) => {
  Song.findById(req.body.id)
  .then(song => song.update(req.body))
  .then(song => res.send(song))
  .catch(next)
})

// router.get('/', function (req, res, next) {
//   Song.scope('defaultScope', 'populated').findAll({ where: req.query })
//   .then(songs => res.json(songs))
//   .catch(next);
// });

router.param('songId', function (req, res, next, id) {
  Song.scope('defaultScope', 'populated').findById(id)
  .then(song => {
    if (!song) {
      const err = Error('Song not found');
      err.status = 404;
      throw err
    }
    req.song = song;
    next();
    return null; // silences bluebird warning about promises inside of next
  })
  .catch(next);
});

router.get('/:songId', function (req, res) {
  res.json(req.song);
});

function open(url) {
  const parsed = urlParse(url)
  return parsed.protocol === 'file:' ?
    fs.createReadStream(decodeURIComponent(parsed.path))
    : request(url)
}

router.get('/:songId/image', function (req, res, next) {
  musicMetadata(open(req.song.url), function (err, metadata) {
    if (err) { return next(err) }
    const pic = metadata.picture[0]
    pic ? res
      .set('Content-Type', mime.lookup(pic.format))
      .send(pic.data)
      : res.redirect('/default-album.jpg')
  })
});

router.get('/:songId/audio', function (req, res, next) {
  const url = urlParse(req.song.url)
  url.protocol === 'file:' ?
    res.sendFile(decodeURIComponent(url.path))
    : res.redirect(req.song.url)
});
