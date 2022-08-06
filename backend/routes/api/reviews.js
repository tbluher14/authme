const express = require("express");
const { Spot, Review, Image, User} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");
const router = express.Router();


// get Current user's reviews
router.get('/current', requireAuth, async (req, res) => {

    const reviews = await Review.findAll({
        include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
            {model: Spot, attributes: {exclude: ['description', 'previewImage', 'createdAt', 'updatedAt']}},
            {model: Image, attributes: ['id', 'imageableId','url']}
        ],
        where: {userId: req.user.id}
    })
    if (reviews.length<1){res.json({message: 'User has no reviews'})}

    res.json(reviews)
})

// add an imagine to a review based on review ID
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
        return res.status(403).json({
            message: 'Maximum number of images for this resource was reached',
            statusCode: 403
        })
    }
    let image = await Image.create({
        url,
        reviewId: req.params.reviewId,
        imageableId: allImages.length + 1,
        imageableType: 'Review',
        userId: currentUserId,
        previewImage: true,
        spotId: req.params.spotId
    })

    return res.json({id: image.id, imageableId: image.imageableId, url: image.url})
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

    if (stars < 1 || stars > 5){
        error.errors.stars = 'Stars must be an integer from 1 to 5'
        return res.status(400).json(error)
    }
    if (!review || !stars) {res.status(400).json(error)}

    if (!reviewToUpdate){
        return res.json( {
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    reviewToUpdate.review = review
    reviewToUpdate.stars = stars

    await reviewToUpdate.save()

    return res.json(reviewToUpdate)

})

// Delete a review
router.delete('/:reviewId', requireAuth, async(req, res) => {
    const selectReview = await Review.findByPk(req.params.reviewId)

    if (!selectReview){
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    await selectReview.destroy()
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})


module.exports = router
