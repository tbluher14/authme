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
    "Reviews",
    [
      {
        userId: 1,
        propertyId: 1,
        review: 'This place is great, the backyard was great for the kids to play in',
        stars: 5
      },
      {
        userId: 2,
        propertyId: 1,
        review: "I can imagine it was really awesome to grow up in this house!",
        stars: 4
      },
      {
      userId: 4,
      propertyId: 2,
      review: 'What a lovely place to stay!',
      stars: 4
      },
    ],
    {}
   )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op
    await queryInterface.bulkDelete(
      'Reviews',
      {
        propertyId: { [Op.in]: [1, 2]}
      }
    )
  }
};
