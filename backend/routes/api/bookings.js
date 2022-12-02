const express = require('express')
const {Op} = require('sequelize')
const { requireAuth } = require('../../utils/auth');
const { User, Spot, Image, Review, Booking } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const sequelize = require('sequelize');
// const { route } = require('./reviews');



// Get all bookings
router.get('/', async (req, res) => {
  const bookings = await Booking.findAll();
  return res.json(bookings);
});

// Get all current user's bookings
router.get('/current', requireAuth, async (req, res) => {

    const userBookings = await Booking.findAll({
        where: {userId: req.user.id},
        include: [
            {model: Spot},
        ],
    })
    const images = await Image.findAll({
      where: {
           previewImage: true
           },
      attributes: ['id','url','spotId'],
           raw: true
       })
    // console.log()
    // attach images to spots
    userBookings.forEach(booking => {
      images.forEach(image => {
          if(image.spotId === booking.spotId) {
              booking.Spot.previewImage = image.url
          }
      })
  });
    return res.json(userBookings)
})


// Edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const lookupBooking = await Booking.findByPk(req.params.bookingId)
    const {startDate, endDate} = req.body



// End date comes before start date
    if (startDate>endDate){
        error.errors.endDate = "endDate cannot come before startDate"
        return res.json(error)
    }
    // booking doesnt exist
    if (!lookupBooking){
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
// Past bookings cannot be edited
let currentDate = '2022-08-07'
if (endDate < currentDate) {
    return res.status(403).json({
      message: "You cannot edit a past booking",
      statusCode: 403,
    });
}

    const { spotId } = lookupBooking.toJSON();
    const allBookings = await Booking.findAll({
      attributes: ["startDate", "endDate"],
      where: {
        spotId,
      },
      raw: true,
    });


// Error handling for conflicting booking
   const err = {
    message:
      "Sorry, this spot is already booked for the specified dates",
    statusCode: 403,
    errors: {}
   }
    for (let dates of allBookings) {
      let start = dates.startDate;
      let end = dates.endDate;
      if (startDate >= start && startDate <= end) {
        err.errors.startDate = "Start date conflicts with an existing booking";
        return res.json(err)
      }
      if (endDate >= start && endDate <= end) {
        err.errors.endDate = "End date conflicts with an existing booking";
        return res.json(err)
      }
    }
    // if ("endDate" in err.errors || "startDate" in err.errors) {
    //   return res.status(403).json(err);
    // }
// check if current user is the owner of the booking

    if (req.user.id !== lookupBooking.userId){
      return res.status(403).json({
        message: 'You must be the booking owner to edit',
        statusCode: 403
      })
    }
// update if no errors trigger
    lookupBooking.startDate = startDate
    lookupBooking.endDate = endDate

    await lookupBooking.save()
    return res.json(lookupBooking)
})


//delete a booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    const currentUser = req.user.id

    console.log("this is the booking in the backend", booking)

    if (!booking){
      return res.json({
          message: "Booking couldn't be found",
          statusCode: 404
      })
  }
    const spot = await Spot.findByPk(booking.spotId)

    if (booking.userId !== currentUser && spot.ownerId !== currentUser ){
        return res.json({
            message: "Cannot delete a booking that isn't yours"
        })
    }
    const { startDate } = booking.toJSON();
    if (new Date(startDate) < new Date()) {
        return res.status(400).json({
          message: "Bookings that have been started can't be deleted",
          statusCode: 400,
        });
      }

    await booking.destroy()
    return res.json({
        message: 'Successfully deleted',
        statusCode: 200
    })
})




module.exports = router
