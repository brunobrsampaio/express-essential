const express   = require('express');
const router    = express.Router();

const AuthController    = require('@controllers/AuthController');
const Auth              = require('@middlewares/Auth');

/**
 * Auth Middleware
 */
router.use([
    '/auth/update',
    '/auth/find'
], Auth);

/**
 * Auth
 */
router.patch('/auth/login', AuthController.login);
router.post('/auth/create', AuthController.create);
router.put('/auth/update', AuthController.update);
router.get('/auth/find/:id', AuthController.find);

module.exports = router;
