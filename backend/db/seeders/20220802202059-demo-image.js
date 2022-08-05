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
        url: "https://3ffb20d6eafb05bffcbf-a7fc0a41f7029defdd3e09482435991b.ssl.cf1.rackcdn.com/properties/photos/41b98076d06ea14dc52b402aa8df839f.jpg",
        reviewId: 1,
        spotId: 1,
        imageableId: 1,
        imageableType: 'Review',
        userId: 1
      },
      {
        url: "https://3ffb20d6eafb05bffcbf-a7fc0a41f7029defdd3e09482435991b.ssl.cf1.rackcdn.com/properties/photos/a5bbe3922377ed97ef3b21d5778351f0.jpg",
        reviewId: 2,
        spotId: 1,
        imageableId: 1,
        imageableType: 'Review',
        userId: 1
      },
      {
      url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.cntraveler.com%2Fphotos%2F5a8f3b070e2cf839e9dbfa1d%2F2%3A1%2Fw_2560%252Cc_limit%2FNYC_GettyImages-640006562.jpg&imgrefurl=https%3A%2F%2Fwww.cntraveler.com%2Fdestinations%2Fnew-york-city&tbnid=ycv4bXUo-AC9jM&vet=12ahUKEwi3gra7_qj5AhWQLzQIHWTWBVkQMygDegUIARDfAQ..i&docid=hzoKwtvWO_Js3M&w=2560&h=1280&q=new%20york%20city&hl=en&ved=2ahUKEwi3gra7_qj5AhWQLzQIHWTWBVkQMygDegUIARDfAQ',
      reviewId: 3,
      spotId: 2,
      imageableId: 1,
      imageableType: 'Review',
      userId: 1
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
