const express = require('express')
const router = express.Router();
const {validate_post,isLoggedIn} = require('../middleware');
const multer  = require('multer');
const {storage} = require('../cloudinary/index');
const upload = multer({ storage });
const passport = require('passport');
const LocalStrategy = require('passport-local');


const barak = require('../controllers/barak');

//home page
router.get('/',barak.render_home_page);

//hmc page
router.get('/hmc',barak.render_hmc_page);

//post page
router.route('/post')
    .get(isLoggedIn,barak.render_post_page)
    .post(isLoggedIn,upload.single('post[image]'),barak.create_post);

//feeds page

router.get('/feeds',barak.render_feed_page);

//delete feed
router.delete('/feeds/:id',barak.delete_feed);

//gallery
router.get('/gallery',barak.gallery);

//register
router.route('/register')
    .get(barak.render_register_page)
    .post(barak.register);


//login
router.route('/login')
    .get(barak.render_login_page)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/barak/login' }),barak.login);


//logout
router.get('/logout',barak.logout);



module.exports = router;