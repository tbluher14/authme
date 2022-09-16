// demo image
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
        reviewId: null,
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
          {
            url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
            reviewId: 3,
            spotId: 6,
            imageableId: 1,
            imageableType: 'Review',
            userId: 1,
            previewImage: true
            },
            {
              url: 'https://images.unsplash.com/photo-1626684496076-07e23c6361ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=834&q=80',
              reviewId: 3,
              spotId: 7,
              imageableId: 1,
              imageableType: 'Review',
              userId: 1,
              previewImage: true
              },
              {
                url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
                reviewId: 3,
                spotId: 8,
                imageableId: 1,
                imageableType: 'Review',
                userId: 1,
                previewImage: true
                },
                {
                  url: 'http://southparkstudios.mtvnimages.com/shared/locations/restaurant-sodosopa.png',
                  reviewId: 3,
                  spotId: 9,
                  imageableId: 1,
                  imageableType: 'Review',
                  userId: 1,
                  previewImage: true
                  },
                  {
                    url: 'https://images.unsplash.com/photo-1570793005386-840846445fed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80',
                    reviewId: 3,
                    spotId: 10,
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
