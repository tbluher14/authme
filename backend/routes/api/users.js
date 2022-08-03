const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// validate signup
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];


// router.post(
//     '/',
//     async (req, res) => {
//       const { email, password, username } = req.body;
//       const user = await User.signup({ email, username, password });

//       await setTokenCookie(res, user);

//       return res.json({
//         user
//       });
//     }
//   );

// get current user
router.get('/current', requireAuth, async (req, res) => {
  const user = {
    id: req.user.id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email
  }
  return res.json(user)
})


  // Sign up
router.post('/', validateSignup, async (req, res) => {
      const { email, firstName, lastName, password, username } = req.body;
      console.log( { email, firstName, lastName, password, username })
      const user = await User.signup({
        email: email,
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
      })

      if (!firstName){
        res.status(400).json({
          message: 'First Name is required'
        })
      }

      if (!lastName) {
        res.status(400).json({
          message: 'Last Name is required'
        })
      }
      await setTokenCookie(res, user);

    res.json({user});
    }
  );



module.exports = router;
