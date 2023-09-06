'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Podcaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Podcaster.belongsToMany(models.Playlist, {
        through: models.PlaylistContent,
        foreignKey: 'PodcasterId',
        as: 'PlaylistContentPlaylist'
      })
      Podcaster.hasMany(models.Podcast, { foreignKey: 'PodcasterId' })
    }
  }
  Podcaster.init({
    name: DataTypes.STRING,
    programName: DataTypes.STRING,
    issuerName: DataTypes.STRING,
    cover: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Podcaster',
    tableName: 'Podcasters',
    underscored: true
  })
  return Podcaster
}
