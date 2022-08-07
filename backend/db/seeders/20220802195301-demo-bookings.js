'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(
    "Bookings",
    [
      {
        spotId: 1,
        userId: 3,
        startDate: '2023-12-24T00:00:00.000Z',
        endDate: '2023-12-24T00:00:00.000Z'
    },
    {
      spotId: 3,
      userId: 1,
      startDate: '2024-11-24T00:00:00.000Z',
      endDate: '2024-11-24T00:00:00.000Z'
  },
  ]
   )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.op
    await queryInterface.bulkDelete(
      'Bookings',
      {
        spotId: {[Op.in]: [1,2]}
      }
    )
  }
};
