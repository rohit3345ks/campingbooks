var mongoose=require('mongoose');
var comment=require('./comment');
var campSchema=new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	price: String,
	created: {type: Date, default: Date.now},
	comments:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}],
	author:{
		id:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
		},
		username: String
	},	
});




var camp=mongoose.model('camp',campSchema);

module.exports=camp;