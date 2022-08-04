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

    const error = {
        message: 'Validation error',
        statusCode: 400,
        errors: {}
    }

    if (startDate>endDate){
        error.errors.endDate = "endDate cannot come before startDate"
        return res.json(error)
    }
    if (!lookupBooking){
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
    let currentDate = '2022-08-04'

    if (currentDate>endDate){
        return res.json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
    }
    const allBookings = await Booking.findAll({
        attributes: ["startDate", 'endDate'],
        where: {
          spotId: req.params.spotId
        }
      })

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
          "Sorry, this property is already booked for the specified dates";
          error.statusCode = 403;
          return res.json(error.errors.startDate)
        }
        if (endDate >= startOfBooking && endDate <= endOfBooking){
          error.errors.endDate = 'End date conflicts with an existing booking'
          error.message =
          "Sorry, this property is already booked for the specified dates";
          error.statusCode = 403;
          return res.json(error.errors.endDate)
        }
      }
      if (error.errors){
        return res.status(403).json(error)
      }
    lookupBooking.startDate = startDate
    lookupBooking.endDate = endDate

    await lookupBooking.save()
    return res.json(lookupBooking)
})


//delete a booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking){
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }

    await booking.destroy()
    return res.json({
        message: 'Successfully deleted',
        statusCode: 200
    })
})

module.exports = router
