const playlistContentServices = require('../services/playlistContent-services')

const playlistContentController = {
  postPodcaster: (req, res, next) => {
    playlistContentServices.postPodcaster(req, (err, data) => err ? next(err) : res.json(data))
  },
  deletePodcaster: (req, res, next) => {
    playlistContentServices.deletePodcaster(req, (err, data) => err ? next(err) : res.json(data))
  }
}

module.exports = playlistContentController
