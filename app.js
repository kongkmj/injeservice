//import module
var express = require('express');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var app = express();


//connect database

mongoose.connect("mongodb://kongtech:kongtech892@ds015889.mlab.com:15889/konguser");
var db = mongoose.connection;
db.once("open",function () {
  console.log("DB connected!");
});
db.on("error",function (err) {
  console.log("DB ERROR :",err);
});


//model setting
/*
var classListSchema = require('./model/class-list');
var classinput = mongoose.model('list', classListSchema);
*/
var classinputSchema = require('./model/class-input');
var classinput = mongoose.model('list', classinputSchema);


//view setting
app.set('view engine','ejs');



//set middlewares
app.set('views',__dirname + '/views');
app.use(express.static(path.join(__dirname,'public')));
//app.engine('html',require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//set route

///page
app.get('/',function (req,res) {
  res.render('partials/index');
});
app.get('/login',function(req,res){
  res.render('partials/login');
});
app.get('/blank',function(req,res){
  res.render('partials/blank');
});
app.get('/signup',function(req,res){
  res.render('partials/signup');
});

///index-class-list
app.get('/class-list',function(req,res){
  classinput.find({}).sort('-createdAt').exec(function(err,list){
    if(err) return res.json({success:false,message:err});
    res.render("partials/lecture/class-list",{data:list});
  });
});
//create
app.post('/class-list', function(req,res){
  console.log(req.body);
  classinput.create(req.body.list,function (err,list) {
    if(err) return res.json({success:false, message:err});
    //res.json({success:true,message:list});
    res.redirect('/class-list');
  });
});
//new
app.get('/class-input', function(req,res){
  classinput.findById(req.params.id, function (err,list) {
    if(err) return res.json({success:false, message:err});
    res.render("partials/lecture/class-list-input", {data:list});
  });
});
//show
app.get('/class-list/:id', function(req,res){
  classinput.findById(req.params.id, function (err,list) {
    if(err) return res.json({success:false, message:err});
    res.render("partials/lecture/class-info", {data:list});
  });
});
//edit
app.get('/class-list/:id/edit', function(req,res){
  classinput.findById(req.params.id, function (err,list) {
    if(err) return res.json({success:false, message:err});
    res.render("partials/lecture/class-list-edit", {data:list});
  });
});
//update
app.put('/class-list/:id', function(req,res){
  req.body.list.updatedAt=Date.now();
  classinput.findByIdAndUpdate(req.params.id, req.body.list, function (err,list) {
    if(err) return res.json({success:false, message:err});
    res.redirect('/class-list/'+req.params.id);
  });
});
//delete
app.delete('/class-list/:id', function(req,res){
  classinput.findByIdAndRemove(req.params.id, function (err,list) {
    if(err) return res.json({success:false, message:err});
    res.redirect('/class-list');
  });
});

///index-lecture
app.get('/lecture',function(req,res){
  classinput.find({}).sort('-createdAt').exec(function(err,posts){
    if(err) return res.json({success:false, message:err});
    res.render('partials/lecture/lecture',{data:posts});
  });
});
//create
app.post('/lecture', function(req,res){
  console.log(req.body);
  classinput.create(req.body.post,function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.redirect('partials/lecture/lecture');
  });
});
//show
app.get('/lecture/:id', function(req,res){
  classinput.findById(req.params.id, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.render("partials/lecture/lecture", {data:post});
  });
});
//edit
app.get('/lecture/:id/edit', function(req,res){
  classinput.findById(req.params.id, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.render("partials/lecture/lecture", {data:post});
  });
});
//update
app.put('/lecture/:id', function(req,res){
  req.body.post.updatedAt=Date.now();
  classinput.findByIdAndUpdate(req.params.id, req.body.post, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.redirect('/partials/'+req.params.id);
  });
});
//delete
app.delete('/lecture/:id', function(req,res){
  classinput.findByIdAndRemove(req.params.id, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.redirect('/partials/lecture/lecture');
  });
});

///index-user-list
app.get('/user-list',function(req,res){
  classinput.find({}).sort('-createdAt').exec(function(err,posts){
    if(err) return res.json({success:false, message:err});
    res.render('partials/user/user-list',{data:posts});
  });
});
//create
app.post('/user-list', function(req,res){
  console.log(req.body);
  classinput.create(req.body.post,function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.redirect('partials/user/user-list');
  });
});
//show
app.get('/user-list/:id', function(req,res){
  classinput.findById(req.params.id, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.render("partials/user/user-list", {data:post});
  });
});
//edit
app.get('/user-list/:id/edit', function(req,res){
  classinput.findById(req.params.id, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.render("partials/user/user-list", {data:post});
  });
});
//update
app.put('/user-list/:id', function(req,res){
  req.body.post.updatedAt=Date.now();
  classinput.findByIdAndUpdate(req.params.id, req.body.post, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.redirect('/partials/'+req.params.id);
  });
});
//delete
app.delete('/user-list/:id', function(req,res){
  classinput.findByIdAndRemove(req.params.id, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.redirect('/partials/user/user-list');
  });
});

///index-organ
app.get('/organ',function(req,res){
  classinput.find({}).sort('-createdAt').exec(function(err,post2){
    if(err) return res.json({success:false, message:err});
    res.render("partials/lecture/organ",{data2:post2});
  });
});
//create
app.post('/organ', function(req,res){
  console.log(req.body);
  classinput.create(req.body.post2,function (err,post2) {
    if(err) return res.json({success:false, message:err});
    res.redirect('partials/lecture/organ');
  });
});
//show
app.get('/organ/:id', function(req,res){
  classinput.findById(req.params.id, function (err,post2) {
    if(err) return res.json({success:false, message:err});
    res.render("partials/lecture/organ", {data2:post2});
  });
});
//edit
app.get('/organ/:id/edit', function(req,res){
    classinput.findById(req.params.id, function (err,post2) {
    if(err) return res.json({success:false, message:err});
    res.render("partials/lecture/organ-edit", {data2:post2});
  });
});
//update
app.put('/organ/:id', function(req,res){
  req.body.post2.updatedAt=Date.now();
  classinput.findByIdAndUpdate(req.params.id, req.body.post2, function (err,post2) {
    if(err) return res.json({success:false, message:err});
    res.redirect('/partials/lecture/organ/'+req.params.id);
  });
});
//delete
app.delete('/organ/:id', function(req,res){
  classinput.findByIdAndRemove(req.params.id, function (err,post2) {
    if(err) return res.json({success:false, message:err});
    res.redirect('/partials/lecture/organ');
  });
});
///index-class-info
app.get('/class-info',function(req,res){
  classinput.find({}).sort('-createdAt').exec(function(err,posts){
    if(err) return res.json({success:false, message:err});
    res.render('partials/lecture/class-info',{data:posts});
  });
});
//create
app.post('/class-info', function(req,res){
  console.log(req.body);
  classinput.create(req.body.post,function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.redirect('partials/lecture/class-info');
  });
});
//show
app.get('/class-info/:id', function(req,res){
  classinput.findById(req.params.id, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.render("partials/lecture/class-info", {data:post});
  });
});
//edit
app.get('/class-info/:id/edit', function(req,res){
  classinput.findById(req.params.id, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.render("partials/lecture/class-info", {data:post});
  });
});
//update
app.put('/class-info/:id', function(req,res){
  req.body.post.updatedAt=Date.now();
  classinput.findByIdAndUpdate(req.params.id, req.body.post, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.redirect('/partials/'+req.params.id);
  });
});
//delete
app.delete('/class-info/:id', function(req,res){
  classinput.findByIdAndRemove(req.params.id, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.redirect('/partials/lecture/class-info');
  });
});

///index-user-info
app.get('/user-info',function(req,res){
  classinput.find({}).sort('-createdAt').exec(function(err,posts){
    if(err) return res.json({success:false, message:err});
    res.render('partials/user/user-info',{data:posts});
  });
});
//create
app.post('/user-info', function(req,res){
  console.log(req.body);
  classinput.create(req.body.post,function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.redirect('partials/user/user-info');
  });
});
//show
app.get('/user-info/:id', function(req,res){
  classinput.findById(req.params.id, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.render("partials/user/user-info", {data:post});
  });
});
//edit
app.get('/user-info/:id/edit', function(req,res){
  classinput.findById(req.params.id, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.render("partials/user/user-info", {data:post});
  });
});
//update
app.put('/user-info/:id', function(req,res){
  req.body.post.updatedAt=Date.now();
  classinput.findByIdAndUpdate(req.params.id, req.body.post, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.redirect('/partials/'+req.params.id);
  });
});
//delete
app.delete('/user-info/:id', function(req,res){
  classinput.findByIdAndRemove(req.params.id, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.redirect('/partials/user/user-info');
  });
});



///index-instructorlist
app.get('/instructor-list',function(req,res){
  classinput.find({}).sort('-createdAt').exec(function(err,posts){
    if(err) return res.json({success:false, message:err});
    res.render('partials/user/instructor-list',{data:posts});
  });
});
//create
app.post('/instructor-list', function(req,res){
  console.log(req.body);
  classinput.create(req.body.post,function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.redirect('partials/user/instructor-list');
  });
});
//show
app.get('/instructor-list/:id', function(req,res){
  classinput.findById(req.params.id, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.render("partials/user/instructor-list", {data:post});
  });
});
//edit
app.get('/instructor-list/:id/edit', function(req,res){
  classinput.findById(req.params.id, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.render("partials/user/instructor-list", {data:post});
  });
});
//update
app.put('/instructor-list/:id', function(req,res){
  req.body.post.updatedAt=Date.now();
  classinput.findByIdAndUpdate(req.params.id, req.body.post, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.redirect('/partials/'+req.params.id);
  });
});
//delete
app.delete('/instructor-list/:id', function(req,res){
  classinput.findByIdAndRemove(req.params.id, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.redirect('/partials/user/instructor-list');
  });
});
///index-instructor-info
app.get('/instructor-info',function(req,res){
  classinput.find({}).sort('-createdAt').exec(function(err,posts){
    if(err) return res.json({success:false, message:err});
    res.render('partials/user/instructor-info',{data:posts});
  });
});
//create
app.post('/instructor-info', function(req,res){
  console.log(req.body);
  classinput.create(req.body.post,function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.redirect('partials/user/instructor-info');
  });
});
//show
app.get('/instructor-info/:id', function(req,res){
  classinput.findById(req.params.id, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.render("partials/user/instructor-info", {data:post});
  });
});
//edit
app.get('/instructor-info/:id/edit', function(req,res){
  classinput.findById(req.params.id, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.render("partials/user/instructor-info", {data:post});
  });
});
//update
app.put('/instructor-info/:id', function(req,res){
  req.body.post.updatedAt=Date.now();
  classinput.findByIdAndUpdate(req.params.id, req.body.post, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.redirect('/partials/'+req.params.id);
  });
});
//delete
app.delete('/instructor-info/:id', function(req,res){
  classinput.findByIdAndRemove(req.params.id, function (err,post) {
    if(err) return res.json({success:false, message:err});
    res.redirect('/partials/user/instructor-info');
  });
});
//start server
app.listen(80,function () {
  console.log('Server listening at port:80');
});
