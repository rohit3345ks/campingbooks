var mongoose=require('mongoose');
var camp=require('./models/campground');
var commentm=require('./models/comment');
var data=[
	{
		name:'cloud rest',
		image:'https://images.unsplash.com/photo-1588989625401-fe48a51e0cc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo autem quisquam officia laborum unde, beatae soluta nemo, dolor tempore deleniti odio quae laboriosam voluptate iure ex excepturi delectus, commodi dicta.'
	},
	{
		name:'Kuch Aur',
		image:'https://images.unsplash.com/photo-1588989625401-fe48a51e0cc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed augue magna, placerat eu efficitur id, iaculis eu nisi. Fusce commodo varius enim, in volutpat eros molestie ut. Proin nec fringilla felis. Vestibulum faucibus est nec sem egestas mattis sollicitudin quis dolor. Aenean pharetra elit ac urna aliquet, et mattis felis posuere. Cras in eros vel risus auctor pellentesque. Nam a purus vitae dui pulvinar finibus quis ut dui. Cras tempus pharetra arcu ac suscipit. Nulla vitae feugiat diam. In et auctor quam. Donec fermentum libero facilisis ipsum pretium aliquet. Donec id tortor purus. Cras sit amet pretium augue. Duis eu.'
	},
	{
		name:'Kuch bhi',
		image:'https://images.unsplash.com/photo-1588989625401-fe48a51e0cc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed augue magna, placerat eu efficitur id, iaculis eu nisi. Fusce commodo varius enim, in volutpat eros molestie ut. Proin nec fringilla felis. Vestibulum faucibus est nec sem egestas mattis sollicitudin quis dolor. Aenean pharetra elit ac urna aliquet, et mattis felis posuere. Cras in eros vel risus auctor pellentesque. Nam a purus vitae dui pulvinar finibus quis ut dui. Cras tempus pharetra arcu ac suscipit. Nulla vitae feugiat diam. In et auctor quam. Donec fermentum libero facilisis ipsum pretium aliquet. Donec id tortor purus. Cras sit amet pretium augue. Duis eu.'
	}
]


//To maintain the order of execution, put the next function in the else part of the callback function 

function seedDB(){
	//Remove All Campgrounds from database
	camp.deleteMany({},function(err,status){
	if(err)
		{
			console.log(err);
		}
	else{
		console.log('All Campgrounds Removed');
	}
	})
	}
		//Add a few Campgrounds 
	// 	data.forEach(function(seed){
	// 	camp.create(seed,function(err,campground){
	// 		if(err){
	// 			console.log(err);
	// 			}
	// 		else{
	// 			console.log('Added a camground');
	// 			//Creting Comments
	// 			commentm.create({
	// 				text: 'This plce is great, but I wish there would be internet.',
	// 				author: 'homer'},function(err,comment){
	// 				if(err){
	// 					console.log(err);
	// 					console.log("ERROR Occured");
	// 				}
	// 				else{
	// 					//Add comment to campground
	// 					campground.comments.push(comment);
	// 					campground.save();
	// 					console.log('Created new Comment');
	// 				}
	// 			})
	// 			}
	// 		})
	// 	})
	// }
// })	
// }

module.exports=seedDB;

