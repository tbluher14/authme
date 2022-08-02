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
        description: 'I used to live here',
        price: 72,
        ownerId: 1,
      },
      {
        address: '1744 Easy Downing',
        city: 'Denver',
        state: 'Colorado',
        country: 'United States',
        lat: 41.266787,
        lng: 100.255322,
        name: "My new house!",
        description: 'I live (close to) here now',
        price: 80,
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
