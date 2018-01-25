'use strict';
const User = require('./user')
const Artist = require('./artist');
const Album = require('./album');
const Song = require('./song');
const Playlist = require('./playlist');
const Room = require('./room');

Room.hasMany(Song);
Song.belongsTo(Room);

Room.hasMany(User);
User.belongsToMany(Room, { through: 'userRoom' });

Song.belongsTo(Album);
Album.hasMany(Song);
Album.belongsTo(Artist); // "Album Artist" is a thing, even if there are
                         // other artists on the album.


Artist.belongsToMany(Song, { through: 'artistSong' });
Song.belongsToMany(Artist, { through: 'artistSong' });

Song.belongsToMany(Playlist, { through: 'playlistSong' });
Playlist.belongsToMany(Song, { through: 'playlistSong' });

// exported just in case, but can also be fetched via db.model('Album') etc.

module.exports = {
  Album,
  Artist,
  Song,
  User,
  Room
};
