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
        {
          url: 'https://images.unsplash.com/photo-1518107784960-eb57c673a7ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          reviewId: 3,
          spotId: 11,
          imageableId: 1,
          imageableType: 'Review',
          userId: 1,
          previewImage: true
          },
          {
            url: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            reviewId: 3,
            spotId: 12,
            imageableId: 1,
            imageableType: 'Review',
            userId: 1,
            previewImage: true
            },
            {
              url: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
              reviewId: 3,
              spotId: 13,
              imageableId: 1,
              imageableType: 'Review',
              userId: 1,
              previewImage: true
              },
              {
                url: 'https://images.unsplash.com/photo-1522043436628-a4bd7867030b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
                reviewId: 3,
                spotId: 14,
                imageableId: 1,
                imageableType: 'Review',
                userId: 1,
                previewImage: true
                },
                {
                  url: 'https://images.unsplash.com/photo-1485038101637-2d4833df1b35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80',
                  reviewId: 3,
                  spotId: 15,
                  imageableId: 1,
                  imageableType: 'Review',
                  userId: 1,
                  previewImage: true
                  },
                  {
                    url: 'https://images.unsplash.com/photo-1475087542963-13ab5e611954?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                    reviewId: 3,
                    spotId: 16,
                    imageableId: 1,
                    imageableType: 'Review',
                    userId: 1,
                    previewImage: true
                    },
                    {
                      url: 'https://images.unsplash.com/photo-1522360262400-9ae2dcfd8cdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
                      reviewId: 3,
                      spotId: 17,
                      imageableId: 1,
                      imageableType: 'Review',
                      userId: 1,
                      previewImage: true
                      },
                      {
                        url: 'https://images.unsplash.com/photo-1521898208365-d7bd8e1ad280?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=713&q=80',
                        reviewId: 3,
                        spotId: 18,
                        imageableId: 1,
                        imageableType: 'Review',
                        userId: 1,
                        previewImage: true
                        },
                        {
                          url: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                          reviewId: 3,
                          spotId: 19,
                          imageableId: 1,
                          imageableType: 'Review',
                          userId: 1,
                          previewImage: true
                          },
                          {
                            url: 'https://images.unsplash.com/photo-1487148742994-2f29d489182f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
                            reviewId: 3,
                            spotId: 20,
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
