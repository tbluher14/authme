const express = require('express')
const {Op} = require('sequelize')
const { requireAuth } = require('../../utils/auth');
const { User, Spot, Image, Review, Booking } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const sequelize = require('sequelize');
const { route } = require('./reviews');



// Get all current user's bookings
router.get('/current', requireAuth, async (req, res) => {

    const userBookings = await Booking.findAll({
        where: {userId: req.user.id},
        include: [
            {model: Spot, attributes: {exclude: ['description', 'previewImage', 'createdAt', 'updatedAt']}},
        ],
    })
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

// Create a booking based on spot id
router.post('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);
    const { startDate, endDate } = req.body;
    const err = {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {}
    }
    if (!startDate){
        err.errors.startDate = "Start date is required"
    }
    if (!endDate){
        err.errors.endDate = "End date is required"
    }
    if (startDate > endDate){
        err.errors.endDate = "End date cannot come before start date"
    }
    if (!startDate || !endDate || startDate > endDate){
        return res.json(err)
    }
    const date1 = new Date(endDate).getTime();
    const date2 = new Date().getTime()

    if (date1 < date2) {
      return res.status(400).json({
        "message": "Cannot create a booking in the past",
        "statusCode": 400,
      })
    }

    const allDates = await Booking.findAll({
        attributes: ["startDate", "endDate"],
        where: {
          spotId: spot.id,
        },
    })

    for (let dates of allDates) {
      let start = dates.startDate;
      let end = dates.endDate;
      let formattedStart = new Date(start).getTime();
      let formattedEnd = new Date(end).getTime();
      let formattedStartDate = new Date(startDate).getTime();
      let formattedEndDate = new Date(endDate).getTime();
      if (formattedStartDate >= formattedStart && formattedStartDate <= formattedEnd) {
        err.errors.startDate = "Start date conflicts with an existing booking";
        return res.json(err)
      }
      if (formattedEndDate >= formattedStart && formattedEndDate <= formattedEnd) {
        err.errors.endDate = "End date conflicts with an existing booking";
        return res.json(err)
      }
    }
    if (err.errors["endDate"] || err.errors["startDate"]) {
      return res.status(400).json(err);
    }
    const booking = await Booking.create({
        userId: req.user.id,
        spotId,
        startDate,
        endDate
    })
    return res.json(booking)
})



module.exports = router
