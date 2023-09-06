'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Playlist.belongsTo(models.User, { foreignKey: 'UserId' })
      Playlist.belongsToMany(models.Podcaster, {
        through: models.PlaylistContent,
        foreignKey: 'PlaylistId',
        as: 'PlaylistContentPodcasters'
      })
    }
  }
  Playlist.init({
    name: DataTypes.STRING,
    UserId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Playlist',
    tableName: 'Playlists',
    underscored: true
  })
  return Playlist
}
