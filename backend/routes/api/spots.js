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

// validate property
const validateProperty = [
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
      const spots = await Spot.findAll()
      for (let i = 0; i < spots.length; i++) {
        let spotsObj = spots[i].dataValues;
        for (let spot in spotsObj) {
            if (true) {
                const avgRatingArray = await Review.findAll({
                    where: { spotId: spotsObj.id },
                    attributes: {
                        include: [
                            [
                                sequelize.fn("AVG", sequelize.col("stars")),
                                "avgStarRating"
                            ]
                        ]
                    }
                  })
                  spotsObj.avgRating = avgRatingArray[0].dataValues.avgStarRating;
              }
            }
          }
          return res.json(spots)
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
      res.json(201, newSpot);
})


// edit a spot
router.put("/:spotId", requireAuth, validateProperty, async (req, res) => {
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
        message: "Property couldn't be found",
        statusCode: 404,
      });
    } else if (spot.ownerId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You must be the owner to edit this property" });
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
        where: {ownerId: req.user.id}
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
    res.json(image)
})

// Get spots of current user
router.get('/current', requireAuth, async (req, res) => {

  const spots = await Spot.findAll({
      where: {ownerId: req.user.id}
  })
  const aggregateReviews = await Review.findAll({
    attributes: [
      [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
    ],
    where: {spotId: spots.id},
    raw: true,
  });

  const spotData = spots.toJSON();
  spotData.avgRating = aggregateReviews.avgRating;


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
  const err = {
    message: "Validation error",
    statusCode: 400,
    errors: {},
  };

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

  if (!review) err.errors.review = "Review text is required";
  if (stars < 1 || stars > 5)
    err.errors.stars = "Stars must be an integer from 1 to 5";
  if (!review || !stars) {
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
      {
        model: Image,
        attributes: ['id', 'url', 'imageableId']
      }
    ],
    where: {
      spotId: spotId
    }
  })
  return res.json(reviews)
})


// Create a booking based on a spot
router.post('/:spotId/bookings', requireAuth, async(req, res) => {
  const spotId = req.params.spotId
  const spot = await Spot.findByPk(spotId)
  const error = {
    message: 'Validation error',
    statusCode: 400,
    errors: {}
  }

  const {startDate, endDate } = req.body

  const allBookings = await Booking.findAll({
    attributes: ["startDate", 'endDate'],
    where: {
      spotId: spotId
    }
  })

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if (!startDate || !endDate || startDate > endDate) {
    return res.status(400).json(error);
  }

  for (let allDates of allBookings){
    let startOfBooking = allDates.startDate
    let endOfBooking = allDates.endDate

    if (startDate >= startOfBooking && startDate <= endOfBooking){
      error.errors.startDate = 'Start date conflicts with an existing booking'
    }
    if (endDate >= startOfBooking && endDate <= endOfBooking){
      error.errors.endDate = 'End date conflicts with an existing booking'
    }
  }
  if ('startDate' in error.errors || 'endDate' in error.errors){
    return res.status(403).json(error)
  }

  const createBooking = await Booking.create({
    spotId: spotId,
    userId: req.user.id,
    startDate,
    endDate
  })

  return res.json(createBooking)
})

// Get all bookings for a spot based on spot ID
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const spotBookings = await Booking.findAll({
      where: {spotId: req.params.spotId}
  })

  const lookUpSpots = await Spot.findByPk(req.params.spotId)
  if (!lookUpSpots){
    return res.json({
      message: "Spot could not be found",
      statusCode: 404
    })
  }
  return res.json(spotBookings)
})




module.exports = router
