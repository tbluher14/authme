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

router.post('/:reviewId/images', requireAuth, async (req, res) => {
     const {url} = req.body
    const currentUserId = req.user.id
    const review = await Review.findByPk(req.params.reviewId, {
        where: {userId: currentUserId}
    })

    if (!review) {
        return res.status(404).json({
            message: 'Spot could not be found',
            statusCode: 404
        })
    }

    const allImages = await Image.findAll({
        where: {
            [Op.and]: [
               {reviewId: req.params.reviewId },
               { imageableType: 'Review'}
            ],
        }
    })
    if (allImages.length > 10){
        return res.status(400).json({
            message: 'Maximum number of images for this resource was reached',
            statusCode: 400
        })
    }
    let image = await Image.create({
        url,
        reviewId: req.params.reviewId,
        imageableId: allImages.length + 1,
        imageableType: 'Review',
        spotId: req.params.spotId
    })
    image = image.toJSON()
    res.json(image)
})


// Edit a review
router.put('/:reviewId', requireAuth, async (req, res)=> {
    const reviewId = req.params.reviewId
    const reviewToUpdate = await Review.findByPk(reviewId)
    const {review, stars } = req.body

    const error = {
        message: 'Validation Error',
        statusCode: 400,
        errors: {}
    }

    if (!review){error.errors.review = 'Review text is required'}
    if (stars < 1 || stars > 5){error.errors.stars = 'Stars must be an integer from 1 to 5'}
    if (!review || !stars) {res.status(400).json(error)}

    reviewToUpdate.review = review
    reviewToUpdate.stars = stars

    await reviewToUpdate.save()

    return res.json(reviewToUpdate)

})



module.exports = router
