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
        description: 'Volutpat odio facilisis mauris sit. Diam phasellus vestibulum lorem sed risus. Nec sagittis aliquam malesuada bibendum. Iaculis at erat pellentesque adipiscing commodo elit. Dis parturient montes nascetur ridiculus mus mauris vitae. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Adipiscing tristique risus nec feugiat in fermentum. Scelerisque in dictum non consectetur a erat nam. Amet aliquam id diam maecenas ultricies mi. Viverra nam libero justo laoreet sit amet cursus. Orci sagittis eu volutpat odio facilisis mauris. Odio ut enim blandit volutpat maecenas. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant. Etiam non quam lacus suspendisse faucibus. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc. Purus non enim praesent elementum facilisis leo vel fringilla est. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Velit dignissim sodales ut eu sem integer vitae.',
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
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing commodo elit at imperdiet dui accumsan sit amet. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Mus mauris vitae ultricies leo integer malesuada. In metus vulputate eu scelerisque felis. Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Sit amet commodo nulla facilisi nullam vehicula ipsum. Odio eu feugiat pretium nibh ipsum consequat nisl vel. Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Malesuada fames ac turpis egestas sed tempus urna.',
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
        description: 'Commodo nulla facilisi nullam vehicula. Aenean vel elit scelerisque mauris pellentesque. Praesent semper feugiat nibh sed pulvinar proin gravida. Non sodales neque sodales ut etiam. Cras ornare arcu dui vivamus arcu felis bibendum. Sed augue lacus viverra vitae congue eu consequat ac felis. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Cursus metus aliquam eleifend mi in nulla posuere. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Tellus in hac habitasse platea dictumst. Cras sed felis eget velit. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
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
        description: 'Praesent semper feugiat nibh sed pulvinar proin gravida. Non sodales neque sodales ut etiam. Cras ornare arcu dui vivamus arcu felis bibendum. Sed augue lacus viverra vitae congue eu consequat ac felis. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Cursus metus aliquam eleifend mi in nulla posuere. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Tellus in hac habitasse platea dictumst. Cras sed felis eget velit. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
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
        description: 'Praesent semper feugiat nibh sed pulvinar proin gravida. Non sodales neque sodales ut etiam. Cras ornare arcu dui vivamus arcu felis bibendum. Sed augue lacus viverra vitae congue eu consequat ac felis. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Cursus metus aliquam eleifend mi in nulla posuere. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Tellus in hac habitasse platea dictumst. Cras sed felis eget velit. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
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
