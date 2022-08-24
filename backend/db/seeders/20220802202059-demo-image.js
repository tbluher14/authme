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
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-668850861862940741/original/7091a16d-00c8-404f-a4cf-85fad49f7e82.jpeg?im_w=720",
        reviewId: 1,
        spotId: 1,
        imageableId: 1,
        imageableType: 'Review',
        userId: 1,
        previewImage: true
      },
      {
        url: "https://a0.muscache.com/im/pictures/7866f5df-f82f-45c6-9f08-4f8240784b80.jpg?im_w=1200",
        reviewId: 2,
        spotId: 3,
        imageableId: 1,
        imageableType: 'Review',
        userId: 1,
        previewImage: true,
      },
      {
      url: 'http://ap.rdcpix.com/499415788/cb6ab14d53d2614036ea9592cd3efed0l-m0xd-w640_h480_q80.jpg',
      reviewId: 3,
      spotId: 2,
      imageableId: 1,
      imageableType: 'Review',
      userId: 1,
      previewImage: true
      },{
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-659308860626057674/original/ce025367-590b-47c7-8c60-992226b8b35e.jpeg?im_w=720',
      reviewId: 3,
      spotId: 4,
      imageableId: 1,
      imageableType: 'Review',
      userId: 1,
      previewImage: true
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51937032/original/276c7cdd-d00d-4c30-b036-e201313a892a.jpeg?im_w=720',
        reviewId: 3,
        spotId: 6,
        imageableId: 1,
        imageableType: 'Review',
        userId: 1,
        previewImage: true
        },
        {
          url: 'https://a0.muscache.com/im/pictures/8d46637b-7d3e-4425-b725-e0e65c209ce0.jpg?im_w=720',
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
