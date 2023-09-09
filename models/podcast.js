'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Podcast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Podcast.belongsTo(models.Podcaster, { foreignKey: 'PodcasterId' })
      Podcast.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: 'PodcastId',
        as: 'FavoriteUsers'
      })
    }
  }
  Podcast.init({
    PodcasterId: DataTypes.STRING,
    episodeTitle: DataTypes.STRING,
    playTime: DataTypes.STRING,
    images: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Podcast',
    tableName: 'Podcasts',
    underscored: true
  })
  return Podcast
}
