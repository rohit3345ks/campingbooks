var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var flash=require('connect-flash');
var passport=require('passport');
var LocalStrategy=require('passport-local');
var methodOverride=require('method-override');
var camp=require('./models/campground');
var comment=require('./models/comment');
var user=require('./models/user');
var seedDB=require('./seeds.js');
var dotenv=require('dotenv');
dotenv.config();

//Requiring Routes
var campgroundRoutes=require('./routes/campgrounds'),
	commentRoutes=require('./routes/comments'),
	indexRoutes=require('./routes/index');




// var passportLocalMongoose=require('passport-local-mongoose');

var url=process.env.DATABASEURL|| "mongodb+srv://rohit:3345@database-gmiut.mongodb.net/yelpcampdevelopment?retryWrites=true&w=majority";

mongoose.connect(url,{
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
}).then(function(){
	console.log('Connected to db');
}).catch(function(err){
	console.log('Error'+err.message);
});

app.use(flash());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.use(methodOverride("_method"));

// seedDB();  //seed the database.
//PASSPORT CONFIGURATION
app.use(require('express-session')({
	secret:'rohit3345ks',
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash('error');
	res.locals.success=req.flash('success');
	next();
});


app.use(indexRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);

// //MIDDLEWARE
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
};

app.listen(process.env.PORT||3000, process.env.IP, function(){
    console.log('The YelpCamp Server is started at PORT 3000');
});