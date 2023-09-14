const { Playlist, PlaylistContent } = require('../models')

const playlistContentServices = {
  postPodcaster: async (req, cb) => {
    try {
      const { playlistId } = req.params
      const { PodcasterId } = req.body
      const playlist = await Playlist.findByPk(playlistId)
      if (req.user.id !== Number(playlist.UserId)) throw new Error('無權更改')
      if (!playlist) throw new Error('該分類不存在')
      const checkPlaylistContent = await PlaylistContent.findOne({
        where: { PlaylistId: playlistId, PodcasterId },
        raw: true
      })
      if (checkPlaylistContent) throw new Error('已加入分類')
      const playlistContent = await PlaylistContent.create({
        PlaylistId: playlistId,
        PodcasterId
      })
      cb(null, playlistContent)
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = playlistContentServices
