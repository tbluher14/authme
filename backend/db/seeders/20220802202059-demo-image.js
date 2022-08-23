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
        url: "https://www.airbnb.com/rooms/548002056877123433?adults=1&category_tag=Tag%3A8522&children=0&infants=0&search_mode=flex_destinations_search&check_in=2022-09-18&check_out=2022-09-23&previous_page_section_name=1000&federated_search_id=4faafae3-b350-414c-856c-0a1db0d443cc",
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
      url: 'https://www.airbnb.com/rooms/13681554?adults=1&category_tag=Tag%3A8522&children=0&infants=0&search_mode=flex_destinations_search&check_in=2022-09-11&check_out=2022-09-16&previous_page_section_name=1000&federated_search_id=4faafae3-b350-414c-856c-0a1db0d443cc',
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
