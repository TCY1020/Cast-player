const playlistServices = require('../services/playlist-services')

const playlistController = {
  getPlaylistPodcaster: (req, res, next) => {
    playlistServices.getPlaylistPodcaster(req, (err, data) => err ? next(err) : res.json(data))
  },
  putPlaylist: (req, res, next) => {
    playlistServices.putPlaylist(req, (err, data) => err ? next(err) : res.json(data))
  },
  postPlaylist: (req, res, next) => {
    playlistServices.postPlaylist(req, (err, data) => err ? next(err) : res.json(data))
  },
  deletePlaylist: (req, res, next) => {
    playlistServices.deletePlaylist(req, (err, data) => err ? next(err) : res.json(data))
  }
}

module.exports = playlistController
