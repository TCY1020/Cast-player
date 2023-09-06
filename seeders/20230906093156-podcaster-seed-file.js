'use strict'
const { faker } = require('@faker-js/faker')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Podcasters',
      Array.from({ length: 50 }, () => ({
        name: faker.person.fullName(),
        program_name: faker.commerce.product(),
        issuer_name: faker.person.fullName(),
        cover: `https://loremflickr.com/320/240/album,music/?random=${Math.random() * 100}`,
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Podcasters', {})
  }
}
