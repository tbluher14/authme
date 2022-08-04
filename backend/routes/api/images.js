const express = require('express')
const {Op} = require('sequelize')
const { requireAuth } = require('../../utils/auth');
const { User, Spot, Image, Review, Booking } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const sequelize = require('sequelize');
const { route } = require('./reviews');



// delete an image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const image = await Image.findByPk(req.params.imageId)

    if (!image){
        return res.json({
            message: "Image couldn't be found",
            statusCode: 404
        })
    }
    await image.destroy()
    return res.json({
        message: 'Successfully deleted',
        statusCode: 200
    })
})

module.exports = router

