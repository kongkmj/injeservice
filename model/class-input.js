var mongoose = require('mongoose');

var classinput = mongoose.Schema({
    class_name: {type: String, required: true},
    class_state: {type: String, required: true},
    class_index: {type: String, required: true},
    class_field: {type: String, required: true},
    organ: {type: String, required: true},
    user_index: {type: String, required: true},
    instructor: {type: String, required: true},
    startdate: {type: String, required: true},
    deadline: {type: String, required: true},
    enddate: {type: String, required: true},
    edu_day: {type: String, required: true},
    edu_time: {type: String, required: true},
    edu_place: {type: String, required: true},
    volume_full: {type: String, required: true},
    volume_reserve: {type: String, required: true},
    edu_cost_index: {type: String, required: true},
    material_cost_index: {type: String, required: true},
    edu_cost: {type: String, required: true},
    material_cost: {type: String, required: true},
    register_method: {type: String, required: true},
    phone: {type: String, required: true},
    content:{type:String,required:true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: Date

});

module.exports = classinput;