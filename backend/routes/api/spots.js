const express = require('express')
const {Op} = require('sequelize')
const { requireAuth } = require('../../utils/auth');
const { User, Spot, Image, Review } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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
    const { ownerId, address, city, state,  country, lat, lng, name, description, price } = req.body;

      const allSpots = await Spot.findAll()

      return res.json(allSpots)
    });

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

router.get('/current', requireAuth, async (req, res) => {

  const spots = await Spot.findAll({
      where: {ownerId: req.user.id}
  })
  if (spots.length<1){res.json({message: 'User has no reviews'})}

  res.json(spots)
})

router.get('/:spotId', async(req, res) => {
  const spot = await Spot.findByPk(req.params.spotId)
  if (!spot) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found"
    })
  }
  return res.json(spot)
})

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

  res.json(newReview);
});



module.exports = router
