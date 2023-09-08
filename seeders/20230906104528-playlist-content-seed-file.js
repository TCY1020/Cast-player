'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const Playlists = await queryInterface.sequelize.query(
      'SELECT * FROM Playlists;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const Podcasters = await queryInterface.sequelize.query(
      'SELECT id FROM Podcasters',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    ) // Podcasters = [{id:1}, {id:2}....]
    const list = []
    await Playlists.forEach(Playlist => {
      for (let i = 0; i < 6; i++) {
        list.push(Playlist.id)
      }
    })
    await queryInterface.bulkInsert('PlaylistContents',
      Array.from({ length: list.length }, (_, index) => ({
        Playlist_id: list[index],
        Podcaster_id: Podcasters[Math.floor(Math.random() * Podcasters.length)].id,
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PlaylistContents', {})
  }
}
