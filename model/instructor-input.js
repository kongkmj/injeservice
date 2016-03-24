var mongoose = require('mongoose');

var instructorinput = mongoose.Schema({
    name:{type:String,required:true},
    sex:{type:String,required:true},
    birth:{type:String,required:true},
    address:{type:String,required:true},
    homephone:{type:String,required:true},
    mobilephone:{type:String,required:true},
    email:{type:String,required:true},
    class_name:{type:String,required:true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: Date

});

module.exports=instructorinput;