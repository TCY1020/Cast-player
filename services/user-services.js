const { User, Playlist } = require('../models')

const userServices = {
  getUserPlaylist: async (req, cb) => {
    try {
      const { id } = req.params
      const user = await User.findByPk(id, {
        include: [
          Playlist
        ]
      })
      if (!user) throw new Error('用戶不存在！')
      cb(null, user)
    } catch (err) {
      cb(err)
    }
  }
}
module.exports = userServices
