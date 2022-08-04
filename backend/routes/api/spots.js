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

          page = Number(page);
          size = Number(size);

          if (Number.isNaN(page)) page = 0;
          if (Number.isNaN(size)) size = 20;

          if (page > 10) page = 10;
          if (size > 40) size = 20;

          if (page < 0) error.errors.page = "Page must be greater than or equal to 0";
          if (size < 0) error.errors.size = "Size must be greater than or equal to 0";
          if (Number(maxLat) > 90) {
            error.errors.maxLat = "Maximum latitude is invalid";
            maxLat = false;
          }
          if (Number(minLat) < -90) {
            error.errors.maxLat = "Minimum latitude is invalid";
            minLng = false;
          }
          if (Number(maxLng) > 180) {
            error.errors.maxLng = "Maximum longitude is invalid";
            maxLng = false;
          }
          if (Number(minLng) < -180) {
            error.errors.minLng = "Minimum longitude is invalid";
            minLng = false;
          }
          if (Number(minPrice) < 0) {
            error.errors.minPrice = "Maximum price must be greater than 0";
            minPrice = false;
          }
          if (Number(maxPrice) < 0) {
            error.errors.maxPrice = "Minimum price must be greater than 0";
            maxPrice = false;
          }

          if (
            page < 0 ||
            size < 0 ||
            (!maxLat && maxLat !== undefined) ||
            (!minLat && minLat !== undefined) ||
            (!maxLng && maxLng !== undefined) ||
            (!minLng && minLng !== undefined) ||
            (!minPrice && minPrice !== undefined) ||
            (!maxPrice && maxPrice !== undefined)
          ) {
            res.status(400);
            res.json(error);
          }

          if (maxLat) {
            pagination.filter.push({
              lat: { [Op.lte]: Number(maxLat) },
            });
          }
          if (minLat) {
            pagination.filter.push({
              lat: { [Op.gte]: Number(minLat) },
            });
          }
          if (minLng) {
            pagination.filter.push({
              lng: { [Op.gte]: Number(minLng) },
            });
          }
          if (maxLng) {
            pagination.filter.push({
              lng: { [Op.lte]: Number(maxLng) },
            });
          }
          if (minPrice) {
            pagination.filter.push({
              price: { [Op.gte]: Number(minPrice) },
            });
          }
          if (maxPrice) {
            pagination.filter.push({
              price: { [Op.lte]: Number(maxPrice) },
            });
          }

          pagination.size = size;
          pagination.page = page;

          const spots = await Spot.findAll({
            where: {
              [Op.and]: pagination.filter,
            },
            limit: pagination.size,
            offset: pagination.size * pagination.page,
          });
          for (let i = 0; i < spots.length; i++) {
            let allSpots = spots[i].dataValues;
            for (let spot in allSpots) {
                if (true) {
                    const avgRating = await Review.findAll({
                        where: { spotId: allSpots.id },
                        attributes: {
                            include: [
                                [
                                    sequelize.fn("AVG", sequelize.col("stars")),
                                    "avgStarRating"
                                ]
                            ]
                        }
                      })
                      allSpots.avgRating = avgRating[0].dataValues.avgStarRating;
                  }
                }
              }
          res.json({
            spots,
            page: pagination.page,
            size: pagination.size,
          });
        })



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
        price
      } = req.body;
      const { id } = req.user;

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
      });

const error = {
        message: "Validation error",
        statusCode: 400,
        errors: {},
      }
    if (!address) error.errors.address = "Street address is required"
    if (!city) error.errors.city = "City is required"
    if (!state) error.errors.state = "State is required"
    if (!country) error.errors.country = "Country is required"
    if (!lat) error.errors.lat = "Latitude is not valid"
    if (!lng) error.errors.lng = "Longitude is not valid"
    if (!name ) error.errors.name = "Name must be less than 50 characters"
    if (!description) error.errors.description =  "Description is required"
    if (!price) error.errors.price = "Price per day is required"

  if (error.errors.length) {
    return res.status(400).json(error);
  }
    return res.json(201, newSpot);
})


// edit a spot
router.put("/:spotId", requireAuth, validateSpot, async (req, res) => {
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

    if (!spot) {
      res.status(404);
      return res.json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    } else if (spot.ownerId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You must be the owner to edit this spot" });
    }

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

    const error = {
      message: "Validation error",
      statusCode: 400,
      errors: {},
    }
      if (!address) error.errors.address = "Street address is required"
      if (!city) error.errors.city = "City is required"
      if (!state) error.errors.state = "State is required"
      if (!country) error.errors.country = "Country is required"
      if (!lat) error.errors.lat = "Latitude is not valid"
      if (!lng) error.errors.lng = "Longitude is not valid"
      if (!name ) error.errors.name = "Name must be less than 50 characters"
      if (!description) error.errors.description =  "Description is required"
      if (!price) error.errors.price = "Price per day is required"

if (error.errors.length) {
  return res.status(400).json(error);
}
    return res.json(spot);
  });


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

  // add an image to a spot by id
router.post('/:spotId/images', requireAuth, async(req, res) => {
    const {url} = req.body
    const currentUserId = req.user.id
    const spot = await Spot.findByPk(req.params.spotId, {
      where: {ownerId: req.user.id},

    })

    if (!spot) {
        return res.status(404).json({
            message: 'Spot could not be found',
            statusCode: 404
        })
    }
    if (spot.ownerId !== currentUserId){
        res.status(403)
        res.json({
            message: 'Only spot owners can add an image',
            status: 403
        })
    }
    const allImages = await Image.findAll({
        where: {
            [Op.and]: [
               {spotId: req.params.spotId },
               { imageableType: 'Spot'}
            ],
        }
    })
    let image = await Image.create({
        url,
        imageableId: allImages.length + 1,
        imageableType: 'Spot',
        spotId: req.params.spotId
    })
    image = image.toJSON()
    const {id, imageableId, spotId, updatedAt, createdAt} = image
    res.json({id: id, url: url, imageableId: imageableId})
})

// Get spots of current user
router.get('/current', requireAuth, async (req, res) => {

  const spots = await Spot.findAll({
      where: {ownerId: req.user.id},
      include: {model: Review, attributes: [
            [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
          ],
        raw: true
        }
  })

  return res.json(spots)
})

// Get Details of a Spot by ID
router.get('/:spotId', async(req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [
      { model: Image, as: "Images", attributes: ["url"] },
      { model: User, as: "Owner", attributes: ["id", "firstName", "lastName"] },
  ]}
  )
  const aggregateReviews = await Spot.findByPk(req.params.spotId, {
    include: {
      model: Review,
      attributes: [],
    },
    attributes: [
      [sequelize.fn("COUNT", sequelize.col("*")), "numReviews"],
      [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
    ],
    raw: true,
  });

  if (!spot) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found"
    })
  }
  const spotData = spot.toJSON();
  spotData.numReviews = aggregateReviews.numReviews;
  spotData.avgStarRating = aggregateReviews.avgStarRating;

  return res.json(spotData)
})

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

  const checkIfReviewExists = await Review.findAll({
    where: {
      [Op.and]: [
        { spotId: req.params.spotId },
        { userId: req.user.id },
      ],
    },
  });

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

  if (!review) err.errors.review = "Review text is required";
  if (stars < 1 || stars > 5) err.errors.stars = "Stars must be an integer from 1 to 5";
  if (!review || stars < 1 || stars > 5) {
    return res.status(400).json(err);
  }

  const newReview = await Review.create({
    userId: req.user.id,
    spotId: req.params.spotId,
    review,
    stars,
  });

  await newReview.save()

  return res.json(newReview);
});


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
        attributes: ['id', 'url', 'imageableId']
      }
    ],
    where: {
      spotId: spotId
    }
  })
  const spot = await Spot.findByPk(spotId)
  if (!spot){
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }
  return res.json(reviews)
})


// Create a booking based on a spot
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

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const error = {
    message: 'Validation error',
    statusCode: 400,
    errors: {}
  }
  if (!startDate) error.errors.startDate = "Start date is required (YYYY-MM-DD)";
  if (!endDate) error.errors.endDate = "End date is required (YYYY-MM-DD)";
  if (startDate > endDate)
    error.errors.endDate = "endDate cannot come before startDate";
  if (!startDate || !endDate || startDate > endDate) {
    return res.status(400).json(error);
  }
  error.message =
    "Sorry, this spot is already booked for the specified dates";
  error.statusCode = 403;


  for (let allDates of allBookings){
    let startOfBooking = allDates.startDate
    let endOfBooking = allDates.endDate

    if (startDate >= startOfBooking && startDate <= endOfBooking){
      error.errors.startDate = 'Start date conflicts with an existing booking'
      error.message =
      "Sorry, this spot is already booked for the specified dates";
      error.statusCode = 403;
      return res.json(error.errors.startDate)
    }
    if (endDate >= startOfBooking && endDate <= endOfBooking){
      error.errors.endDate = 'End date conflicts with an existing booking'
      error.message =
      "Sorry, this spot is already booked for the specified dates";
      error.statusCode = 403;
      return res.json(error.errors.endDate)
    }
  }
  if (error.errors){
    return res.status(403).json(error)
  }

  const createBooking = await Booking.create({
    spotId: spotId,
    userId: req.user.id,
    startDate,
    endDate
  })
  await createBooking.save()

  return res.json(createBooking)
})

// Get all bookings for a spot based on spot ID
router.get('/:spotId/bookings', requireAuth, async (req, res) => {

  const spot = await Spot.findByPk(req.params.spotId, {
    where: { ownerId: req.user.id },
    attributes: ["ownerId"],
  });

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const allBookings = await Booking.findAll({
    where: { spotId: req.params.spotId },
    attributes: ["spotId", "startDate", "endDate"],
  });

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




module.exports = router
