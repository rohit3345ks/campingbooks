var mongoose=require('mongoose');
var commentSchema = new mongoose.Schema({
    text: String,
	created: {type: Date, default: Date.now},
    author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		},
		username: String
	}
});


var commentm=mongoose.model("Comment", commentSchema);
module.exports = commentm;