var mongoose = require('mongoose');

var usercheck = {
    classId:mongoose.Schema.Types.ObjectId,
    userId:mongoose.Schema.Types.ObjectId,
    number:{type:Number,required:true},
    date:{type:String,reqruired:true},
    check:{type:String,required:true}
}

module.exports = usercheck;