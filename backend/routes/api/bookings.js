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
        include: [
            {model: Spot, attributes: {exclude: ['description', 'previewImage', 'createdAt', 'updatedAt']}},
        ],
        where: {userId: req.user.id}
    })
    return res.json(userBookings)
})


// Edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const lookupBooking = await Booking.findByPk(req.params.bookingId)
    const {startDate, endDate} = req.body

    lookupBooking.startDate = startDate
    lookupBooking.endDate = endDate

    const error = {
        message: 'Validation error',
        statusCode: 400,
        errors: {}
    }

    if (startDate>endDate){
        error.errors.endDate = "endDate cannot come before startDate"
    }
    if (error.errors.length > 0){
        return res.json(error)
    }
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
