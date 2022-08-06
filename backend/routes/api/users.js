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
      .withMessage('User with that email already exists'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('User with that username already exists'),
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

    
      const findUserByUsername = await User.findAll({
        where: {username: username}
      })
      if (findUserByUsername.length > 0){
        return res.json({
          message: 'User with that email already exists',
          statusCode: 403
        })
      }
      const findUserByEmail = await User.findAll({
        where: {email: email}
      })

      if (findUserByEmail.length > 0){
        return res.json({
          message: 'User with that username already exists',
          statusCode: 403
        })
      }

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

      if (!username){
        res.status(400).json({
          message: "Username is required"
        })
      }

      const user = await User.signup({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
      })

     const token = await setTokenCookie(res, user);

    res.json({user, token});
    }
  );



module.exports = router;
