const playlistServices = require('../services/playlist-services')

const playlistController = {
  getPlaylistPodcaster: (req, res, next) => {
    playlistServices.getPlaylistPodcaster(req, (err, data) => err ? next(err) : res.json(data))
  }
}

module.exports = playlistController
