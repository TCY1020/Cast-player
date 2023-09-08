'use strict'
const { faker } = require('@faker-js/faker')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const podcasters = await queryInterface.sequelize.query(
      'SELECT * FROM Podcasters',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const list = []
    await podcasters.forEach(podcaster => {
      for (let i = 0; i < 6; i++) {
        list.push(podcaster.id)
      }
    })
    const formattedTime = (cb) => {
      return new Date(cb).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
    }
    await queryInterface.bulkInsert('Podcasts',
      Array.from({ length: list.length }, (_, index) => ({
        Podcaster_id: list[index],
        episode_title: faker.commerce.productName(),
        play_time: formattedTime(faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2020-01-01T00:59:00.000Z' })),
        description: faker.lorem.sentence({ min: 3, max: 5 }),
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Podcasts', {})
  }
}
