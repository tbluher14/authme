// demo reviews
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
        spotId: 1,
        review: 'This place is great, the backyard was great for the kids to play in',
        stars: 5
      },
      {
        userId: 2,
        spotId: 3,
        review: "I can imagine it was really awesome to grow up in this house!",
        stars: 4
      },
      {
      userId: 3,
      spotId: 4,
      review: 'What a lovely place to stay!',
      stars: 4
      },
      {
        userId: 3,
        spotId: 5,
        review: 'What a lovely place to stay!',
        stars: 3
        },
        {
          userId: 3,
          spotId: 6,
          review: 'What a lovely place to stay!',
          stars: 3
          },
          {
            userId: 3,
            spotId: 7,
            review: 'What a lovely place to stay!',
            stars: 5
            },
            {
              userId: 3,
              spotId: 8,
              review: 'What a lovely place to stay!',
              stars: 4
              },
              {
                userId: 3,
                spotId: 10,
                review: 'What a lovely place to stay!',
                stars: 4
                },
                {
                  userId: 3,
                  spotId: 11,
                  review: 'What a lovely place to stay!',
                  stars: 2
                  },
                  {
                    userId: 3,
                    spotId: 12,
                    review: 'What a lovely place to stay!',
                    stars: 5
                    },
                    {
                      userId: 3,
                      spotId: 14,
                      review: 'What a lovely place to stay!',
                      stars: 4
                      },
                      {
                        userId: 3,
                        spotId: 15,
                        review: 'What a lovely place to stay!',
                        stars: 5
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
        spotId: { [Op.in]: [1, 2]}
      }
    )
  }
};
