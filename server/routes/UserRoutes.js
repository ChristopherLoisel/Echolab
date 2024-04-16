const express = require('express');
const router = express.Router();
const { register, login, updateUser, getUsers } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.put('/update', updateUser);
router.get('/users', getUsers);

module.exports = router;
