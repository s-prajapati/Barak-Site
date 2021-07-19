const hmc_member = require('../models/hmc_schema');
const post = require('../models/post_schema');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user_schema');


module.exports.render_home_page = (req,res)=>{
    res.render('barak/index');
}

module.exports.render_hmc_page = async (req,res)=>{
    const members = await hmc_member.find({});
    res.render('barak/hmc',{members});
}

module.exports.render_post_page = (req,res)=>{
    res.render('barak/post')
}

module.exports.create_post = catchAsync( async (req,res,next)=>{
    const {title,image,description,expiry} = req.body.post; 
    const new_feed = new post({
        title : title,
        description : description,
        expiry : expiry,
   })
   if(req.file){
    //new_feed.images = req.files.map(f=>({url:f.path , filename:f.filename}))

    const {path,filename} = req.file;
    new_feed.image.url = path;
    new_feed.image.filename = filename;   
     }
    await new_feed.save();
    req.flash('success','Your Post has been uploaded succesfully');
    res.redirect('/barak/feeds');
});

module.exports.render_feed_page = catchAsync( async (req,res)=>{
    const posts = await post.find({});
    res.render('barak/feeds',{posts});
})

module.exports.delete_feed = catchAsync(async (req,res)=>{
    const {id} = req.params;
    const to_del_post = post.findById(id);
    await post.findByIdAndDelete(id);

    req.flash('error','Successfully deleted campground')
    res.redirect('/barak/feeds');
})

module.exports.gallery = (req,res)=>{
    res.render('barak/gallery');
}

module.exports.render_register_page = (req,res)=>{
    res.render('users/register');
}

module.exports.register = async (req,res,next)=>{
    try{
        const {email,username,password} = req.body;
        const user = new User({email,username});
        const registeredUser = await User.register(user , password);
        req.login(registeredUser,err=>{
            if(err) return next(err);
            req.flash('success','Welcome to Barak HMC!');
            res.redirect('/barak');
        });  
    } catch(e){
        req.flash('error',e.message);
        res.redirect('/barak/register')
    }
}


module.exports.render_login_page = (req,res)=>{
    res.render('users/login');
}

module.exports.login = (req,res)=>{
    req.flash('success','welcome back!');
    console.log(req.session.returnTo);
    const redirectUrl = req.session.returnTo || '/barak';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
} 

module.exports.logout = (req,res)=>{
    req.logout();
    req.flash('success','Goodbye');
    res.redirect('/barak');
}