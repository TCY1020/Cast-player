'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT * FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const list = []
    users.forEach(user => {
      list.push({
        ...user,
        name: '通勤清單',
        icon: '🚌'
      })
      list.push({
        ...user,
        name: '學習清單',
        icon: '📚'
      })
      list.push({
        ...user,
        name: '睡前清單',
        icon: '💤'
      })
      list.push({
        ...user,
        name: '我的 Podcast',
        icon: '⛪'
      })
    })
    await queryInterface.bulkInsert('Playlists',
      Array.from({ length: list.length }, (_, index) => ({
        User_id: list[index].id,
        icon: list[index].icon,
        name: list[index].name,
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Playlists', {})
  }
}
