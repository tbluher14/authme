const express = require("express");
const { Spot, Review, Image, User} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");
const router = express.Router();



router.get('/current', requireAuth, async (req, res) => {

    const reviews = await Review.findAll({
        include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
            {model: Spot, attributes: {exclude: ['description', 'previewImage', 'createdAt', 'updatedAt']}},
            {model: Image, attributes: ['url']}
        ],
        where: {userId: req.user.id}
    })
    if (reviews.length<1){res.json({message: 'User has no reviews'})}

    res.json(reviews)
})



module.exports = router
