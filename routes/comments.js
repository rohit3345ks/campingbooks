var express=require('express');
var router=express.Router({mergeParams:true});

var camp=require('../models/campground');
var comment=require('../models/comment');

var middleware=require('../middleware');

// NEW FORM
router.get("/new", middleware.isLoggedIn ,function(req,res){
	camp.findById(req.params.id,function(err,campground){
	if(err){
			console.log(err);
		} 
		else{
			res.render('comments/new',{'campground':campground});
		}
	})
});

//POST ROUTE
router.post('/', middleware.isLoggedIn, function(req,res){
	//lookup campground using id
	camp.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			redirect('/campgrounds');
		}
		else{
			comment.create(req.body.comment,function(err,comment){
		if(err){
			req.flash('error','Something went wrong. Cannot post the comment');
			console.log("Couldn't create the comment");
		}
		else{
			//Have Username & id
			comment.author.id=req.user._id;
			comment.author.username=req.user.username;
			comment.save();
			campground.comments.push(comment);
			campground.save();
			req.flash('success','successfully added the comment');
			res.redirect('/campgrounds/'+campground._id);
		}
	})
		}
	})
	//create new comment
	
	//connect new comment to campground
	//redirect to showpage
})

router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req,res){
	comment.findById(req.params.comment_id, function(err,foundComment){
		if(err){
			res.redirect('back');
		}
		else{
			res.render('comments/edit',{'campground_id': req.params.id, 'comment': foundComment});
		}
	});
}) ;
//req.params.id is defined in app.js line number 65. so id ->campground._id
//comment_id -> comment._id

router.put('/:comment_id', middleware.checkCommentOwnership, function(req,res){
	comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
		if(err){
			res.redirect('/campgrounds');
		}
		else{
			res.redirect('/campgrounds/'+req.params.id);
		}
	})
})

router.delete('/:comment_id', middleware.checkCommentOwnership, function(req,res){
	comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect('back');
		}
		else{
			req.flash('success','Comment Deleted');
			res.redirect('/campgrounds/'+req.params.id);
		}
	})
})


module.exports=router;