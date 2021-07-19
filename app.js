if(process.env.NODE_ENV!== "production"){
    require('dotenv').config()
}

const express = require('express');
const mongoose = require('mongoose');
const hmc_member = require('./models/hmc_schema');
const post = require('./models/post_schema');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejs_mate = require('ejs-mate') 
const multer  = require('multer');
const {storage} = require('./cloudinary/index');
const upload = multer({ storage });
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user_schema');
const ExpressError = require('./utils/ExpressError');
const {validate_post,isLoggedIn} = require('./middleware');
const catchAsync = require('./utils/catchAsync');
const barak_routes = require('./routes/barak');

//mongoose connection
mongoose.connect('mongodb://localhost:27017/barak',{
    useNewUrlParser :true,
    useCreateIndex :true,
    useUnifiedTopology : true,
    useFindAndModify : false
});
const db = mongoose.connection;

db.on("error",console.error.bind(console,"Connection Error : "));
db.once("open",()=>{
    console.log('Database Connected')
});



app.use(express.urlencoded({extended: true}));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/node_modules/lightbox2', express.static(path.join(__dirname, '/node_modules/lightbox2')));
app.use(methodOverride('_method'));


app.engine('ejs',ejs_mate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));


//session & flash
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


app.use(session(sessionConfig)); 
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/barak',barak_routes);

app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found',404));
})

app.use((err,req,res,next)=>{
    const {statusCode=500 }=err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong'
    res.status(statusCode).render('error',{err});
    res.send("oh boy something went wrong")
})

app.listen(3000,()=>{
    console.log('Server Started');
})