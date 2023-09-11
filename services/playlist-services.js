const { Playlist, Podcaster } = require('../models')

const playlistServices = {
  getPlaylistPodcaster: async (req, cb) => {
    try {
      const { playlistId } = req.params
      let podcaster = await Playlist.findByPk(playlistId)
      if (req.user.id !== Number(podcaster.UserId)) throw new Error('無權造訪')
      podcaster = await Playlist.findAll({
        where: { id: playlistId },
        include: [
          { model: Podcaster, as: 'PlaylistContentPodcasters' }
        ],
        raw: true,
        nest: true
      })
      cb(null, podcaster)
    } catch (err) {
      cb(err)
    }
  }
}
module.exports = playlistServices
