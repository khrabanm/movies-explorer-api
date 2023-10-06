const router = require('express').Router();

const { validateUser } = require('../utils/validator');
const {
  getCurrentUser,
  updateProfileInfo,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', validateUser, updateProfileInfo);

module.exports = router;
