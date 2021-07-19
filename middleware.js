const post_joi_schema = require('./joi_schema');
const ExpressError = require('./utils/ExpressError');

module.exports.validate_post = (req,res,next) => {
    
    const {error} = post_joi_schema.validate(req.body)
    if(error){
        const msg = error.details.map(el=> el.message).join(',')
        throw new ExpressError(msg,400)
    }else{
        next();
    }
    
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/barak/login');
    }
    next();
}