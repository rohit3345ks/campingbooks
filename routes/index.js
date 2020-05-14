var express=require('express');
var app=express();
var router=express.Router();
var passport=require('passport');
var user=require('../models/user');



// ROOT ROUTE
router.get('/',function(req,res){
    res.render('landing');
});



//*******************************

//AUTH ROUTES

//*******************************


//SHOW REGISTER PAGE
router.get('/register',function(req,res){
	res.render('register');
});


//REGISTER LOGIC
router.post('/register',function(req,res){
	var newUser=new user({username: req.body.username});
	user.register(newUser, req.body.password, function(err,User){
		if(err)
			{
				req.flash("error", err.message);
				res.redirect('/register');
				return;
			}
		passport.authenticate('local')(req,res,function(){
			req.flash('success','Welcome to Yelcamp '+ User.username);
			res.redirect('/campgrounds');
		});
	});
});


//LOGIN PAGE
router.get('/login',function(req,res){
	res.render('login');
})


//LOGIN LOGIC
router.post('/login',passport.authenticate('local',{
	successRedirect: '/campgrounds',
	failureRedirect: '/login'
}),function(req,res){});


//LOGOUT LOGIC
router.get('/logout',function(req,res){
	req.logout();
	req.flash('success','Logged you Out!!');
	res.redirect('/campgrounds');
});



module.exports=router;