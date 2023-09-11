const { Playlist, Podcaster } = require('../models')

const playlistServices = {
  getPlaylistPodcaster: async (req, cb) => {
    try {
      const { playlistId } = req.params
      let podcaster = await Playlist.findByPk(playlistId)
      if (req.user.id !== Number(podcaster.UserId)) throw new Error('無權造訪')
      if (!podcaster) throw new Error('該分類不存在')
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
  },
  putPlaylist: async (req, cb) => {
    try {
      const { name } = req.body
      const { playlistId } = req.params
      const playlist = await Playlist.findByPk(playlistId)
      if (req.user.id !== Number(playlist.UserId)) throw new Error('無權更改')
      if (!playlist) throw new Error('該分類不存在')
      const playlistUpdate = await playlist.update({ name })
      cb(null, playlistUpdate)
    } catch (err) {
      cb(err)
    }
  }
}
module.exports = playlistServices