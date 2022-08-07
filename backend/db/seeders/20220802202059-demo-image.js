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
    'Images',
    [
      {
        url: "https://demoimage1",
        reviewId: 1,
        spotId: 1,
        imageableId: 1,
        imageableType: 'Review',
        userId: 1,
        previewImage: true
      },
      {
        url: "https://demoImage2",
        reviewId: 2,
        spotId: 3,
        imageableId: 1,
        imageableType: 'Review',
        userId: 1,
        previewImage: true,
      },
      {
      url: 'https//:demoImage3',
      reviewId: 3,
      spotId: 2,
      imageableId: 1,
      imageableType: 'Review',
      userId: 1,
      previewImage: true
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
    const Op = Sequelize.Op
    await queryInterface.bulkDelete(
      'Images',
      {
        spotId: {[Op.in]: [1,2]}
      }
    )
  }
};
