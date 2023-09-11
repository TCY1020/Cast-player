const { User, Playlist } = require('../models')

const userServices = {
  getUserPlaylist: async (req, cb) => {
    try {
      const { id } = req.params
      if (req.user.id !== Number(id)) throw new Error('無權進入')
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
