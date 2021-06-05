const express = require('express');
const mongoose = require('mongoose');
const hmc_member = require('./models/hmc_schema');
const post = require('./models/post_schema');
const app = express();
const path = require('path');
const ejs_mate = require('ejs-mate') 

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
app.engine('ejs',ejs_mate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));


//main page
app.get('/barak',(req,res)=>{
    res.render('barak/index');
})

//hmc page
app.get('/barak/hmc',async (req,res)=>{
    const members = await hmc_member.find({});
    res.render('barak/hmc',{members});
})



//post
app.get('/barak/post',(req,res)=>{
    res.render('barak/post')
})
app.post('/barak/post',async (req,res)=>{
    const {title,image,description,expiry} = req.body.post;
    const new_feed = new post({
        title : title,
        image : image,
        description : description,
        expiry : expiry
    })
    await new_feed.save();
    res.redirect('/barak/feeds');
})

//feed page
app.get('/barak/feeds',async (req,res)=>{
    const posts = await post.find({});
    res.render('barak/feeds',{posts});
})

app.listen(3000,()=>{
    console.log('Server Started');
})