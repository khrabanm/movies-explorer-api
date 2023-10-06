const router = require('express').Router();

const { validateUser } = require('../utils/validator');
const {
  getCurrentUser,
  updateProfileInfo, unlogin,
} = require('../controllers/users');

router.get('/signout', unlogin);
router.get('/me', getCurrentUser);
router.patch('/me', validateUser, updateProfileInfo);

module.exports = router;
