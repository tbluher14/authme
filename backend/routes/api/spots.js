const express = require('express')
const {Op} = require('sequelize')
const { requireAuth } = require('../../utils/auth');
const { User, Spot, Image, Review, Booking } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const sequelize = require('sequelize');
const { route } = require('./reviews');
const booking = require('../../db/models/booking');
const spot = require('../../db/models/spot');
const { singlePublicFileUpload } = require('../../awsS3');

// validate spot
const validateSpot = [
    check('address').exists({ checkFalsy: true }).withMessage('Please provide a valid address.'),
    check('city').exists({ checkFalsy: true }).withMessage('City is required'),
    check("state").exists({ checkFalsy: true }).withMessage("State is required"),
    check("country").exists({ checkFalsy: true }).withMessage("Country is required"),
    check("lat").exists({ checkFalsy: true }).withMessage("Latitude is not valid"),
    check("lng").exists({ checkFalsy: true }).withMessage("Longitude is not valid"),
    check("name").exists({ checkFalsy: true }).isLength({ max: 50 }).withMessage("Name must be less than 50 characters"),
    check("description").exists({ checkFalsy: true }).withMessage("Description is required"),
    check("price").exists({ checkFalsy: true }).withMessage("Price per day is required"),
    handleValidationErrors,
    ];

// ***************************************************************************************
// get all spots
router.get("/", async (req, res) => {
          const pagination = {
            filter: [],
          };
          let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } =
            req.query;

            const error = {
            message: "Validation Error",
            statusCode: 400,
            errors: {},
          };
// Pagination query filters
          page = parseInt(page);
          size = parseInt(size);

          if (Number.isNaN(page)) page = 0;
          if (Number.isNaN(size)) size = 20;
          if (minPrice < 0) minPrice = 0;
          if (maxPrice < 0) maxPrice = 0
          if (page >= 1 && size === 0){
              size = 20
          }
          if (page >= 1 && size >= 1) {
              pagination.limit = size
              pagination.offset = size * (page-1)
          }

const spots = await Spot.findAll({
          raw: true,
          ...pagination
          });
// lookup all images
    const images = await Image.findAll({
       where: {
            previewImage: true
            },
       attributes: ['id','url','spotId'],
            raw: true
        })
// lookup all reviews
    const reviews = await Review.findAll({raw:true})
        spot.previewImage = null


// attach images to spots
    spots.forEach(spot => {
            images.forEach(image => {
                if(image.spotId === spot.id) {
                    spot.previewImage = image.url
                }
            })
        });

// add reviews and stars to each spot
        spots.forEach(spot => {
          let totalStars = 0
          let numReviews = 0
          for (let i = 0; i<reviews.length; i++){
            if (spot.id === reviews[i].spotId){

              totalStars += reviews[i].stars
              numReviews ++
            }
          }
          if (numReviews > 0){
          spot['avgRating'] = totalStars/numReviews
          }
        })
// response
        res.status(200)
        res.json({
          spots,
          page: pagination.page,
          size: pagination.size,
        });
      })
// ***************************************************************************************



// ***************************************************************************************
// create a spot
router.post('/', requireAuth, async (req, res, next) => {

    const {
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        previewImage,
        tags
      } = req.body;


      const { id } = req.user;

const error = {
        message: "Validation error",
        statusCode: 400,
        errors: {},
      }


    if (!address) {
      error.errors.address = "Street address is required"

      return res.status(400).json(error)
    }
    if (address.length<3) {
      error.errors.address = "Please enter a valid address"

      return res.status(400).json(error)
    }
    if (!city) {
      error.errors.city = "City is required"

      return res.status(400).json(error)
    }
    if (city.length<3) {
      error.errors.address = "Please enter a valid city"

      return res.status(400).json(error)
    }
    if (!state) {
      error.errors.state = "State is required"
      return res.status(400).json(error)
    }
    if (state.length<2) {
      error.errors.address = "Please enter a valid state"

      return res.status(400).json(error)
    }
    if (!country) {
      error.errors.country = "Country is required"

      return res.status(400).json(error)
    }
    if (city.length>20){
      error.errors.address = "Please only enter the first 20 characters of the city"

      return res.status(400).json(error)
    }
    if (state.length>16){
      error.errors.address = "Please only enter the first 16 characters of the state"

      return res.status(400).json(error)
    }
    if (country.length<3) {
      error.errors.address = "Please enter a valid country"

      return res.status(400).json(error)
    }
    if (isNaN(+lat + 1)){ error.errors.lat = "Latitude is not a valid number"

    return res.status(400).json(error)
  }
  if (isNaN(+lng + 1)){ error.errors.lng = "Longitude is not a valid number"

  return res.status(400).json(error)
  }
  if (isNaN(+price + 1)){ error.errors.price = "Price is not a valid number"

    return res.status(400).json(error)
  }
    if (!lng) {

      error.errors.lng = "Longitude is not valid"

      return res.status(400).json(error)
    }
    if (!name ) {
      error.errors.name = "Name must be less than 50 characters"

      return res.status(400).json(error)
    }
    if (!description){
       error.errors.description =  "Description is required"

       return res.status(400).json(error)
    }
    if (!price) {
      error.errors.price = "Price per day is required"

      return res.status(400).json(error)
    }
    const jpeg = "jpg"
    if (!previewImage.startsWith('https')){
      error.errors.previewImage = "Please include a valid url to the image"
      return res.status(400).json(error)
    }

    // const image = await singlePublicFileUpload(req.file)
    const newSpot = await Spot.create({
      ownerId: id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage,
      tagA,
      tagB
    });

    return res.json(201, newSpot);
})
// ***************************************************************************************



// ***************************************************************************************
// edit a spot
router.put("/:spotId", requireAuth, async (req, res) => {
    let {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;

    const spot = await Spot.findByPk(req.params.spotId);


    // check if spot exists
    if (!spot) {
      res.status(404);
      return res.json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
      // check if spot belongs to user
    } if (spot.ownerId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You must be the owner to edit this spot" });
    }
        // Error handling for validation errors
        const error = {
          message: "Validation error",
          statusCode: 400,
          errors: {},
        }
        if (name.length < 3) {
          error.errors.name = "Please Enter a valid spot name"

          return res.status(400).json(error)
        }

      if (!address) {
        error.errors.address = "Street address is required"

        return res.status(400).json(error)
      }

      if (address.length<3) {
        error.errors.address = "Please enter a valid address"

        return res.status(400).json(error)
      }
      if (!city) {
        error.errors.city = "City is required"

        return res.status(400).json(error)
      }
      if (city.length<3) {
        error.errors.address = "Please enter a valid city"

        return res.status(400).json(error)
      }
      if (!state) {
        error.errors.state = "State is required"

        return res.status(400).json(error)
      }
      if (state.length<2) {
        error.errors.address = "Please enter a valid state"

        return res.status(400).json(error)
      }
      if (!country) {
        error.errors.country = "Country is required"

        return res.status(400).json(error)
      }
      if (country.length<3) {
        error.errors.address = "Please enter a valid country"

        return res.status(400).json(error)
      }
      if (city.length>20){
        error.errors.address = "Please only enter the first 20 characters of the city"

        return res.status(400).json(error)
      }
      if (state.length>16){
        error.errors.address = "Please only enter the first 16 characters of the state"

        return res.status(400).json(error)
      }
      if (isNaN(+lat + 1)){ error.errors.lat = "Latitude is not a valid number"

      return res.status(400).json(error)
    }
    if (isNaN(+lng + 1)){ error.errors.lng = "Longitude is not a valid number"

    return res.status(400).json(error)
    }
    if (isNaN(+price + 1)){ error.errors.price = "Price is not a valid number"

      return res.status(400).json(error)
    }
      if (!lng) {

        error.errors.lng = "Longitude is not valid"

        return res.status(400).json(error)
      }
      if (!name ) {
        error.errors.name = "Name must be less than 50 characters"
        return res.status(400).json(error)
      }
      if (!description){
         error.errors.description =  "Description is required"
         return res.status(400).json(error)
      }
      if (!price) {
        error.errors.price = "Price per day is required"

        return res.status(400).json(error)
      }


    // update spot if it belongs to user
    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;


    await spot.save();

    const response = {
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt
    }



  // return the updated spot
    return res.json(response);
  });
// ***************************************************************************************



// ***************************************************************************************
// delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        return res.json({
            message: 'Spot could not be found',
            status: 404
        })
    }
    await spot.destroy()
    return res.json({
        message: "Successfully deleted",
        status: 200
    })
})
// ***************************************************************************************


// ***************************************************************************************
  // add an image to a spot by id
router.post('/:spotId/images', requireAuth, async(req, res) => {
    const { user } = req;
    const { url, previewImage} = req.body

    const spot = await Spot.findByPk(req.params.spotId)
  // check if spot exists
    if(!spot){
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }
    // check if spot belongs to owner
    if(spot.ownerId !== user.id) {
        res.status(403)
        res.json({
            "message": "Forbidden",
            "statusCode": 403
          })
    }
    // if spot belongs to owner, add image and return response
    if(spot.ownerId === user.id) {
        let image = {}

        const newImage = Image.build({
            url,
            previewImage,
            spotId: spot.id,
            reviewId: null,
            userId: user.id
        })
        await newImage.save()

        image.id = newImage.id
        image.imageableId = newImage.spotId
        image.url = newImage.url

        res.status(200)
        res.json(image)
    }
})
// ***************************************************************************************

// ***************************************************************************************
// Get spots of current user
router.get('/current', requireAuth, async (req, res) => {

  const spots = await Spot.findAll({
    attributes: {
      include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")),
      "avgRating"],
      ]},
      include: [
        {model: Review,  attributes: []}],
        where: {ownerId: req.user.id},
      raw: true,
      group: ['Spot.id'],
    })
    const images = await Image.findAll({
      where: {
          previewImage: true
      },
      attributes: ['id','url','spotId'],
      raw: true
  })
    spots.forEach(spot => {
      images.forEach(image => {
          if(image.spotId === spot.id) {
              spot.previewImage = image.url
          }
      })
  });

    return res.json(spots)
  })
// ***************************************************************************************


// ***************************************************************************************
// Get Details of a Spot by ID
router.get('/:spotId', async(req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [
      { model: Image, as: "Images", attributes: ["url"]},
      { model: User, as: "Owner", attributes: ["id", "firstName", "lastName"] },
  ],
  exclude: {model: Spot, attributes: ['previewImage']},
  },

  )
  // look up all reviews
  const aggregateReviews = await Spot.findByPk(req.params.spotId, {
    include: {
      model: Review,
      attributes: [],
    },
    attributes: [
      [sequelize.fn("COUNT", sequelize.col("stars")), "numReviews"],
      [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
    ],
    raw: true,
  });

 // error handling for spot
  if (!spot) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }
  const spotData = spot.toJSON();
  spotData.numReviews = aggregateReviews.numReviews;
  spotData.avgStarRating = aggregateReviews.avgStarRating;

  const response = {
  id: spotData.id,
  address: spotData.address,
  city: spotData.city,
  state: spotData.state,
  country: spotData.country,
  lat: spotData.lat,
  lng: spotData.lng,
  name: spotData.name,
  description: spotData.description,
  price: spotData.price,
  ownerId: spotData.ownerId,
  createdAt: spotData.createdAt,
  updatedAt: spotData.updatedAt,
  Images: spotData.Images,
  Owner: spotData.Owner,
  numReviews: spotData.numReviews,
  avgStarRating: spotData.avgStarRating
  }
  return res.json(response)
})
// ***************************************************************************************


// ***************************************************************************************
// Create review by spot id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
  const { review, stars } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
// check if review exists
  const checkIfReviewExists = await Review.findAll({
    where: {
      [Op.and]: [
        { spotId: req.params.spotId },
        { userId: req.user.id },
      ],
    },
  });
// error handling
  if (checkIfReviewExists.length >= 1) {
    return res.status(403).json({
      message: "User already has a review for this spot",
      statusCode: 403,
    });
  }
  const err = {
    message: "Validation error",
    statusCode: 400,
    errors: {},
  };
// validation error handling
  if (review.length<3) {
    err.errors.review = "Review text is required";
    return res.status(400).json(err)
  }
  if (stars < 1 || stars > 5) err.errors.stars = "Stars must be an integer from 1 to 5";
  if (!review || stars < 1 || stars > 5) {
    return res.status(400).json(err);
  }

// if no errors, create a review
  const newReview = await Review.create({
    userId: req.user.id,
    spotId: req.params.spotId,
    review,
    stars,
  });

  await newReview.save()

  return res.json(newReview);
});
// ***************************************************************************************



// ***************************************************************************************
// Get reviews by spot ID
router.get('/:spotId/reviews', async (req, res) => {
  const spotId = req.params.spotId
  const reviews = await Review.findAll({
    include: [
      {model: User,
      attributes: {exclude: ['username', 'hashedPassword', 'createdAt', 'updatedAt', 'email']}
    },
      {
        model: Image,
        attributes: ['id', 'url', 'imageableId'],
      }
    ],
    where: {
      spotId: spotId
    }
  })
  const spot = await Spot.findAll({
    include: {
      model: Image, as: 'Images',
      attributes: ['id', 'url', 'imageableId'],
      where: {
        id: spotId
    },
    where: {
      id: spotId
    }
    }
  })
  // // error handling
  // if (!spot.length){
  //   return res.json({
  //     message: "I FOUND THE ERROR",
  //     statusCode: 404
  //   })
  // }
  return res.json(reviews)
})
// ***************************************************************************************



// ***************************************************************************************
// Create a booking based on a spot id
router.post('/:spotId/bookings', requireAuth, async(req, res) => {
  const spotId = req.params.spotId
  const spot = await Spot.findByPk(spotId)
  const {startDate, endDate } = req.body

  const allBookings = await Booking.findAll({
    attributes: ["startDate", 'endDate'],
    where: {
      spotId: req.params.spotId
    }
  })

  // if no spot, error
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
// error handling:
  const error = {
    message: 'Validation error',
    statusCode: 400,
    errors: {}
  }

  // if start date or end date are missing or the start date is after the end date, throw error
  if (!startDate) error.errors.startDate = "Start date is required (YYYY-MM-DD)";
  if (!endDate) error.errors.endDate = "End date is required (YYYY-MM-DD)";
  if (startDate > endDate)
    error.errors.endDate = "endDate cannot come before startDate";
  if (!startDate || !endDate || startDate > endDate) {
    return res.status(400).json(error);
  }

// iterate through all bookings and check for overlapping dates
  for (let allDates of allBookings){

    let startOfBookingParse = Date.parse(allDates.startDate)
    let startDateReqParse = Date.parse(startDate)
    let endofBookingParse = Date.parse(allDates.endDate)
    let endofReqParse = Date.parse(endDate)

    if (startDateReqParse >= startOfBookingParse && startDateReqParse <= endofBookingParse){
      error.errors.startDate = 'Start date conflicts with an existing booking'
      error.message =
      "Sorry, this spot is already booked for the specified dates";
      error.statusCode = 403;
      return res.json(error)
    }
    if (endofReqParse >= startOfBookingParse && endofReqParse <= endofBookingParse){
      error.errors.endDate = 'End date conflicts with an existing booking'
      error.message =
      "Sorry, this spot is already booked for the specified dates";
      error.statusCode = 403;
      return res.json(error)
    }
  }
  if ( 'startDate' in error.errors  || 'endDate' in error.errors){
    return res.status(403).json(error)
  }

  // if no errors, create booking
  const createBooking = await Booking.create({
    spotId: spotId,
    userId: req.user.id,
    startDate,
    endDate
  })
  await createBooking.save()

  return res.json(createBooking)
})
// ***************************************************************************************



// ***************************************************************************************
// Get all bookings for a spot based on spot ID
router.get('/:spotId/bookings', requireAuth, async (req, res) => {

  const spot = await Spot.findByPk(req.params.spotId,{
    where: { ownerId: req.user.id },
    attributes: ["ownerId"],
  })


  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
// all bookings if the spot does not belong to current user
  const allBookings = await Booking.findAll({
    where: { spotId: req.params.spotId },
    attributes: ["spotId", "startDate", "endDate"],
  });


  // booking for the owner
  const ownerBookings = await Booking.findAll({
    where: { spotId: req.params.spotId },
    include: {
      model: User,
      attributes: ["id", "firstName", "lastName"],
    },
  });

  if (spot.ownerId === req.user.id) {
    return res.json({ Bookings: ownerBookings });
  } else {
    return res.json({ Bookings: allBookings });
  }
})
// ***************************************************************************************

// search spots

router.get('/search', async (req, res) => {
  const { city, state, country, name } = req.query;
  console.log(req)
  const spots = await Spot.findAll({
    where: {
      'name': name,
    },
    include: {
      model: Image,
      attributes: ['id', 'url', 'imageableId'],
    }
  })
  return res.json(spots)
})

module.exports = router
