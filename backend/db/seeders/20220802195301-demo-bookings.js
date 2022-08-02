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
        propertyId: 1,
        userId: 3,
        startDate: '2022-8-1',
        endDate: '2022-8-10'
    },
    {
      propertyId: 2,
      userId: 1,
      startDate: '2022-7-1',
      endDate: '2022-7-10'
  }
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
        propertyId: {[Op.in]: [1,2]}
      }
    )
  }
};
