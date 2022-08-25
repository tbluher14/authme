'use strict';

const { query } = require("express");

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
   return queryInterface.bulkInsert(
    'Spots',
    [
      {
        address: '82 Glenmoor Place',
        city: 'Denver',
        state: 'Colorado',
        country: 'United States',
        lat: 40.024245,
        lng: 100.255322,
        name: "My old house",
        description: 'This is an older family house',
        price: 72,
        ownerId: 1,
      },
      {
        address: '1744 North Downing',
        city: 'Denver',
        state: 'Colorado',
        country: 'United States',
        lat: 41.266787,
        lng: 100.255322,
        name: "My new house!",
        description: 'My newest house!',
        price: 80,
        ownerId: 2,
      },
      {
        address: '1755 EasT Downing',
        city: 'Ft. Collins',
        state: 'Colorado',
        country: 'United States',
        lat: 40.436787,
        lng: 100.255322,
        name: "My vacation house!",
        description: 'My family likes to vacation here',
        price: 90,
        ownerId: 3,
      },
      {
        address: '5324 App Academy Dr.',
        city: 'Alma',
        state: 'Colorado',
        country: 'United States',
        lat: 40.423432,
        lng: 100.23422,
        name: "Grad House",
        description: 'I lived here after graduation',
        price: 120,
        ownerId: 1,
      },
      {
        address: '1234 App Academy Dr.',
        city: 'Colorado Springs',
        state: 'Colorado',
        country: 'United States',
        lat: 40.423432,
        lng: 100.23422,
        name: "The Newest Location",
        description: 'An App Academy house',
        price: 190,
        ownerId: 1,
      },
      {
        address: '8792 App Academy Dr.',
        city: 'Little Town',
        state: 'Maine',
        country: 'United States',
        lat: 40.423432,
        lng: 100.23422,
        name: "Best Place on Earth",
        description: 'Truly the greatest place',
        price: 190,
        ownerId: 1,
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
    await queryInterface.dropTable('Spots')
  }
};
