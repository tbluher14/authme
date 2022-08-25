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
        url: "https://tinyurl.com/3j53bw6n",
        reviewId: 1,
        spotId: 1,
        imageableId: 1,
        imageableType: 'Review',
        userId: 1,
        previewImage: true
      },
      {
        url: "https://tinyurl.com/2n97wfjz",
        reviewId: 2,
        spotId: 3,
        imageableId: 1,
        imageableType: 'Review',
        userId: 1,
        previewImage: true,
      },
      {
      url: 'https://tinyurl.com/mrx93eu6',
      reviewId: 3,
      spotId: 2,
      imageableId: 1,
      imageableType: 'Review',
      userId: 1,
      previewImage: true
      },{
      url: 'https://tinyurl.com/3d4whb7e',
      reviewId: 3,
      spotId: 4,
      imageableId: 1,
      imageableType: 'Review',
      userId: 1,
      previewImage: true
      },
      {
        url: 'https://tinyurl.com/hemd4722',
        reviewId: 3,
        spotId: 6,
        imageableId: 1,
        imageableType: 'Review',
        userId: 1,
        previewImage: true
        },
        {
          url: 'https://tinyurl.com/27y2bnce',
          reviewId: 3,
          spotId: 5,
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
