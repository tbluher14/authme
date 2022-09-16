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
        name: "Flagstaff Photohaus - Epitome of Modern Luxury in Brand New Two Bedroom Unit",
        description: 'Built by Alta photographer and local legend, Tom Plofchan, the Alta PhotoHaus has been an important part of Alta’s storied history since the late 1960s. Situated in a prime location across from the Alta Lodge and Alta Ski Area Wildcat base area, this 2 bedroom plus open loft, 2 bath Alta ski condo boasts a rich legacy and offers guests the epitome of modern luxury in the mountains.',
        price: 400,
        ownerId: 1,
      },
      {
        address: '1744 North Downing',
        city: 'Denver',
        state: 'Colorado',
        country: 'United States',
        lat: 41.266787,
        lng: 100.255322,
        name: "Sprawling Luxury Modern Home with Home Theater, Sauna and Hot Tub on Private Deer Crest",
        description: 'A sprawling, three-level home with exposed log beams, soaring ceilings and wall-to-wall windows, Mountain Glade sits in the gated Deer Crest community at Deer Valley Resort, offering ski-in, ski-out access to the private, groomed Pioche ski run.',
        price: 400,
        ownerId: 2,
      },
      {
        address: '1755 East Downing',
        city: 'Ft. Collins',
        state: 'Colorado',
        country: 'United States',
        lat: 40.436787,
        lng: 100.255322,
        name: "A Modern Home Located in SodaSoppa",
        description: 'Classic chalet meets industrial chic at this contemporary villa within The Colony. A glass elevator leads past steel support beams and gear art in the soaring great room to a basement wonderland with a cinema, games room, and even a sports court for basketball, racquetball, and wallyball. Ski right to the intermediate and advanced Flat Iron run, then cozy up by the fire or in the alfresco hot tub.',
        price: 700,
        ownerId: 3,
      },
      {
        address: '5324 App Academy Dr.',
        city: 'Alma',
        state: 'Colorado',
        country: 'United States',
        lat: 40.423432,
        lng: 100.23422,
        name: "The Residents at SodaSopa",
        description: 'Relaxation comes easy at PhotoHaus Baldy. The inviting living room is adorned with contemporary Mitchell Gold furnishings, a gas fireplace and a queen sofa sleeper inviting guests to stretch out in modern style on their ski vacation. The gourmet kitchen is designed with your vacation in mind and features high-end appliances and essentials, an espresso maker, and a dining area for celebrating vacation time with friends and family.',
        price: 400,
        ownerId: 1,
      },
      {
        address: '1234 App Academy Dr.',
        city: 'Colorado Springs',
        state: 'Colorado',
        country: 'United States',
        lat: 40.423432,
        lng: 100.23422,
        name: "Residents at SodaSoppa",
        description: 'Winter Ski Out/ Ski In cabin with the best panoramic views in Brian Head. Enjoy fully furnished luxury accommodations with 3 full bed rooms plus a loft and 3 bathrooms. Summer mountain biking, fishing and National Parks just minutes from Cabin.',
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
        description: 'Winter Ski Out/ Ski In cabin with the best panoramic views in Brian Head. Enjoy fully furnished luxury accommodations with 3 full bed rooms plus a loft and 3 bathrooms. Summer mountain biking, fishing and National Parks just minutes from Cabin.',
        price: 190,
        ownerId: 1,
      },
      {
        // 7
        address: '8792 App Academy Dr.',
        city: 'Park City',
        state: 'Utah',
        country: 'United States',
        lat: 40.423432,
        lng: 100.23422,
        name: "Best Place on Earth",
        description: 'Stay in style at one of Deer Valley’s most legendary properties at a Stein Eriksen Residences - 5 Bedroom villa. These luxury vacation rentals are a contemporary expansion of the venerable Stein Eriksen Lodge in the heart of Silver Lake Village, and pair the lodge’s famed five-star service with a great location on the Silver Dollar ski run.',
        price: 190,
        ownerId: 1,
      },
      {
        // 8
        address: '8792 App Academy Dr.',
        city: 'Ogden',
        state: 'Utah',
        country: 'United States',
        lat: 40.423432,
        lng: 100.23422,
        name: "Sleek designer villa with Uinta Mountain views",
        description: 'Your holiday at Stein Eriksen includes a full breakfast buffet during winter and the use of private ski lockers. Guests are also welcome at the shared indoor/outdoor infinity pool, al-fresco hot tubs, firepits and fitness center. Each 5-Bedroom Residence has its own balcony with a hot tub, as well as indoor entertaining areas featuring a satellite TV, sound system, Wi-Fi and wine fridge.',
        price: 190,
        ownerId: 1,
      },
      {
        // 9
        address: '8792 App Academy Dr.',
        city: 'SoDoSoPa',
        state: 'Colorado',
        country: 'United States',
        lat: 40.423432,
        lng: 100.23422,
        name: "South Downtown South Park",
        description: "Sodosopa is a shopping, dining and entertainment district that is highly cultural. It features hip hangouts such as Steed, Bi the Garage, Brightons, The Stag, and Savor the Goodness. Go on back through Rusty Alley and meet up with your friends at Soda Space. Coming soon are The Lofts at Sodosopa and The Villas at Kenny's House.",
        price: 1000,
        ownerId: 1,
      },
      {
        // 10
        address: '8792 App Academy Dr.',
        city: 'Sun Valley',
        state: 'Idaho',
        country: 'United States',
        lat: 40.423432,
        lng: 100.23422,
        name: "Sun Valley Cabin and Spa",
        description: 'Charming Rustic Loft apartment on the beautiful grounds of Wadley Farms. With spectacular views of our gardens, vineyard, Mount Timpanogos and Castle, there really is no other place like it. Whether you are attending an event on-site, or are here for work or vacation, this is the place for you. Located at the base of the Wasatch mountains there is a lifetime of outdoor recreation only minutes away.',
        price: 190,
        ownerId: 1,
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
    await queryInterface.dropTable('Spots')
  }
};
