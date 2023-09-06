'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PlaylistContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  PlaylistContent.init({
    PlaylistId: DataTypes.STRING,
    PodcasterId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PlaylistContent',
    tableName: 'PlaylistContents',
    underscored: true
  })
  return PlaylistContent
}
