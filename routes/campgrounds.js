var express=require('express');
var router=express.Router();
var camp=require('../models/campground');
var middleware=require('../middleware');
//INDEX - Display All
router.get('/',function(req,res){
    camp.find({},function(err, camps){
		if(err){
			console.log("Something Went Wrong");
		}
		else{
			res.render('campgrounds/campground',{'campgrounds':camps});
		}
	})
    
})
// CREATE - Adding something to DB
router.post('/',middleware.isLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
	var desc=req.body.description;
	var price=req.body.price;
	var author={
		id:req.user._id,
		username:req.user.username
	}
    var newCampground=new camp({
		name:name,
		image:image,
		description: desc,
		price: price,
		author:author
	});
	
    newCampground.save(function(err, camps){
		if(err){
			console.log('Something Went Wrong');
		}
		else{
			console.log("Everything went fine");
			console.log(camps);
			res.redirect('/campgrounds');
		}
	})
    
})

//NEW- Shows the form to add data to db 
router.get('/new',middleware.isLoggedIn, function(req,res){
    res.render('campgrounds/new');
})



//SHOW Particular Data  - /show/:id
router.get("/:id",function(req,res){
	camp.findById(req.params.id).populate('comments').exec(function(err,pcamp){
			if(err){
				console.log('Something went wrong during comments population');
				}
			else{
				res.render('campgrounds/show',{'campground':pcamp});
			}
		})
});


//EDIT CAMPGROUND ROUTE

router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req,res){
	//is user logged in 
		camp.findById(req.params.id,function(err,foundCampground){
			res.render('campgrounds/edit',{'campground':foundCampground});
	});
});


//UPDATE CAMPGROUND ROUTE
router.put('/:id/edit',middleware.checkCampgroundOwnership, function(req,res){
	camp.findByIdAndUpdate(req.params.id, req.body.upcamp, function(err,updatedCampground){
		if(err){
			res.redirect('/campgrounds');
			console.log("Campground Updation Issue");
		}
		else{
			console.log('Updated the Campground');
			res.redirect('/campgrounds/'+req.params.id);
		}
	})
})


//DESTROY ROUTE

router.delete('/:id/delete',middleware.checkCampgroundOwnership, function(req,res){
	camp.findByIdAndRemove(req.params.id,function(err,okay){
		if(err){
			res.redirect('/campgrounds');
			console.log('Error occured during campground deleting.');
		}
		else{
			res.redirect('/campgrounds');
			console.log('You have deleted the Campground');
		}
	})
});





module.exports=router;