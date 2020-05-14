// All middlewares will go here
var camp=require('../models/campground');
var comment=require('../models/comment');
var middlewareObj={
	
}

middlewareObj.checkCampgroundOwnership=function(req,res,next){
	if(req.isAuthenticated()){
		camp.findById(req.params.id,function(err,foundCampground){
		if(err){
			req.flash('error','Campground Not Found');
			res.redirect('back');
		}
		else{
			//Does user own the campground
			//campground.author.id is a mongoose object
			//req.user._id is a string 
			// Therefore, === will not work here.
			if(foundCampground.author.id.equals(req.user._id)){
				next();
			}
			else{
				req.flash("error",'You do not have permissions to do that.');
				res.redirect("back");
			}	
		}
	});
	}
	else{
		req.flash('error','You need to be logged in to view that.');
		res.redirect('back');
	}
}

middlewareObj.checkCommentOwnership=function(req,res,next){
	if(req.isAuthenticated()){
		comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			req.flash("error",'You need to be logged in to view that.')
			res.redirect('back');
		}
		else{
			//Does user own the campground
			//campground.author.id is a mongoose object
			//req.user._id is a string 
			// Therefore, === will not work here.
			if(foundComment.author.id.equals(req.user._id)){
				next();
			}
			else{
				req.flash("error",'You do not have permissions to view that.');
				res.redirect("back");
			}	
		}
	});
	}
	else{
		req.flash("error",'You are not allowed to do that.');
		res.redirect('back');
	}
}

middlewareObj.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('error',"You need to be logged in to continue");
	res.redirect('/login');
};

module.exports=middlewareObj;