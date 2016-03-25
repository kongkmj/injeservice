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
db.once("open", function () {
    console.log("DB connected!");
});
db.on("error", function (err) {
    console.log("DB ERROR :", err);
});


//model setting
/*
 var classListSchema = require('./model/class-list');
 var classinput = mongoose.model('list', classListSchema);
 */
var classinputSchema = require('./model/class-input');
var classinput = mongoose.model('list', classinputSchema);

var userinputSchema = require('./model/user-input');
var userinput = mongoose.model('list2', userinputSchema);

var instructorinputSchema = require('./model/instructor-input');
var instructorinput = mongoose.model('list3', instructorinputSchema);

var classuserSchema = require('./model/classanduser');
var classuser = mongoose.model('list4', classuserSchema);

var usercheckSchema = require('./model/check');
var usercheck = mongoose.model('list5',usercheckSchema);


//view setting
app.set('view engine', 'ejs');


//set middlewares
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
//app.engine('html',require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//set route

///page

app.get('/', function (req, res) {
    classinput.find({}).sort('-createdAt').exec(function (err, list) {
        if (err) return res.json({success: false, message: err});
        res.render("partials/index", {data: list});
        });
    });
app.get('/login', function (req, res) {
    res.render('partials/login');
});
app.get('/blank', function (req, res) {
    res.render('partials/blank');
});
app.get('/signup', function (req, res) {
    res.render('partials/signup');
});

///index-class-list
app.get('/class-list', function (req, res) {
    classinput.find({}).sort('-createdAt').exec(function (err, list) {
        if (err) return res.json({success: false, message: err});
        res.render("partials/class/class-list", {data: list});
    });
});
//create
app.post('/class-list', function (req, res) {
    console.log(req.body);
    classinput.create(req.body.list, function (err, list) {
        if (err) return res.json({success: false, message: err});
        //res.json({success:true,message:list});
        res.redirect('/class-list');
    });
});
//newclass
app.get('/class-input', function (req, res) {
    classinput.findById(req.params.id, function (err, list) {
        if (err) return res.json({success: false, message: err});
        res.render("partials/class/class-list-input", {data: list});
    });
});
app.get('/class-user-input', function (req, res) {
    userinput.find({}).sort('-createdAt').exec(function (err, list2) {
        if (err) return res.json({success: false, message: err});
        res.render('partials/user/classuserinput', {data: list2});
    });
});
//show
app.get('/class-list/:id', function (req, res) {
    classinput.findById(req.params.id, function (err, list) {
        if (err) return res.json({success: false, message: err});
       // console.log(list);

        classuser.find({classId: req.params.id}, function (err, list2) {
            if (err) return res.json({success: false, message: err});
            var condition = [];
            for (var i = 0; i <list2.length; i++) {
                condition.push({_id: list2[i].userId});
               // condition2.push({_id:list2[i].classId});
            }
           // console.log(condition);

            userinput.find({"$or": condition}, function (err, users) {
              //  console.log("userinfo:",users);
                res.render("partials/class/class-info", {data: list, data2: users});
            });
        });
    });
});
//info
app.get('/user-check/:userId/:classId', function (req, res) {

    var condition = {
        userId: req.params.userId,
        classId:req.params.classId
    };
    //console.log(condition);

    usercheck.find(condition, function (err, check) {
        if (err) return res.json({success: false, message: err});
        console.log(condition);
       // console.log(check);
        res.render("partials/user/user-check", {data: check})
    });
});
//edit
app.get('/class-list/:id/edit', function (req, res) {
    classinput.findById(req.params.id, function (err, list) {
        if (err) return res.json({success: false, message: err});
        res.render("partials/class/class-list-edit", {data: list});
    });
});
//update
app.put('/class-list/:id', function (req, res) {
    req.body.list.updatedAt = Date.now();
    classinput.findByIdAndUpdate(req.params.id, req.body.list, function (err, list) {
        if (err) return res.json({success: false, message: err});
        res.redirect('/class-list/' + req.params.id);
    });
});
//delete
app.delete('/class-list/:id', function (req, res) {
    classinput.findByIdAndRemove(req.params.id, function (err, list) {
        if (err) return res.json({success: false, message: err});
        res.redirect('/class-list');
    });
});


///index-lecture
app.get('/lecture', function (req, res) {
    classinput.find({}).sort('-createdAt').exec(function (err, posts) {
        if (err) return res.json({success: false, message: err});
        res.render('partials/lecture/lecture', {data: posts});
    });
});
//create
app.post('/lecture', function (req, res) {
    console.log(req.body);
    classinput.create(req.body.post, function (err, post) {
        if (err) return res.json({success: false, message: err});
        res.redirect('partials/lecture/lecture');
    });
});
//show
app.get('/lecture/:id', function (req, res) {
    classinput.findById(req.params.id, function (err, post) {
        if (err) return res.json({success: false, message: err});
        res.render("partials/lecture/lecture", {data: post});
    });
});
//edit
app.get('/lecture/:id/edit', function (req, res) {
    classinput.findById(req.params.id, function (err, post) {
        if (err) return res.json({success: false, message: err});
        res.render("partials/lecture/lecture", {data: post});
    });
});
//update
app.put('/lecture/:id', function (req, res) {
    req.body.post.updatedAt = Date.now();
    classinput.findByIdAndUpdate(req.params.id, req.body.post, function (err, post) {
        if (err) return res.json({success: false, message: err});
        res.redirect('/partials/' + req.params.id);
    });
});
//delete
app.delete('/lecture/:id', function (req, res) {
    classinput.findByIdAndRemove(req.params.id, function (err, post) {
        if (err) return res.json({success: false, message: err});
        res.redirect('/partials/lecture/lecture');
    });
});

///index-user-list
app.get('/user-list', function (req, res) {
    userinput.find({}).sort('-createdAt').exec(function (err, list2) {
        if (err) return res.json({success: false, message: err});
        res.render('partials/user/user-list', {data: list2});
    });
});
//create
app.post('/user-list', function (req, res) {
    console.log(req.body);
    userinput.create(req.body.list2, function (err, list2) {
       // console.log(list2);
        if (err) return res.json({success: false, message: err});
        res.redirect('/user-list');
    });
});
//new
app.get('/user-input', function (req, res) {
    userinput.findById(req.params.id, function (err, list2) {
        if (err) return res.json({success: false, message: err});
        res.render("partials/user/user-info-input", {data: list2});
    });
});
//show
app.get('/user-list/:id', function (req, res) {
    userinput.findById(req.params.id, function (err, list2) {
        if (err) return res.json({success: false, message: err});
        res.render("partials/user/user-info", {data: list2});
    });
});
//edit
app.get('/user-list/:id/edit', function (req, res) {
    userinput.findById(req.params.id, function (err, list2) {
        if (err) return res.json({success: false, message: err});
        res.render("partials/user/user-list", {data: list2});
    });
});
//update
app.put('/user-list/:id', function (req, res) {
    req.body.post.updatedAt = Date.now();
    userinput.findByIdAndUpdate(req.params.id, req.body.list2, function (err, list2) {
        if (err) return res.json({success: false, message: err});
        res.redirect('/partials/' + req.params.id);
    });
});
//delete
app.delete('/user-list/:id', function (req, res) {
    userinput.findByIdAndRemove(req.params.id, function (err, list2) {
        if (err) return res.json({success: false, message: err});
        res.redirect('/partials/user/user-list');
    });
});

///index-organ
app.get('/organ', function (req, res) {
    classinput.find({}).sort('-createdAt').exec(function (err, post2) {
        if (err) return res.json({success: false, message: err});
        res.render("partials/lecture/organ", {data: post2});
    });
});
//create
app.post('/organ', function (req, res) {
    console.log(req.body);
    classinput.create(req.body.post2, function (err, post2) {
        if (err) return res.json({success: false, message: err});
        res.redirect('partials/lecture/organ');
    });
});
//show
app.get('/organ/:id', function (req, res) {
    classinput.findById(req.params.id, function (err, post2) {
        if (err) return res.json({success: false, message: err});
        res.render("partials/lecture/organ", {data: post2});
    });
});
//edit
app.get('/organ/:id/edit', function (req, res) {
    classinput.findById(req.params.id, function (err, post2) {
        if (err) return res.json({success: false, message: err});
        res.render("partials/lecture/organ-edit", {data: post2});
    });
});
//update
app.put('/organ/:id', function (req, res) {
    req.body.post2.updatedAt = Date.now();
    classinput.findByIdAndUpdate(req.params.id, req.body.post2, function (err, post2) {
        if (err) return res.json({success: false, message: err});
        res.redirect('/partials/lecture/organ/' + req.params.id);
    });
});
//delete
app.delete('/organ/:id', function (req, res) {
    classinput.findByIdAndRemove(req.params.id, function (err, post2) {
        if (err) return res.json({success: false, message: err});
        res.redirect('/partials/lecture/organ');
    });
});



///index-instructorlist
app.get('/instructor-list', function (req, res) {
    instructorinput.find({}).sort('-createdAt').exec(function (err, list3) {
        if (err) return res.json({success: false, message: err});
        res.render('partials/instructor/instructor-list', {data: list3});
    });
});
//create
app.post('/instructor-list', function (req, res) {
    console.log(req.body);
    instructorinput.create(req.body.list3, function (err, list3) {
        console.log(list3);
        if (err) return res.json({success: false, message: err});
        res.redirect('/instructor-list');
    });
});
//new
app.get('/instructor-input', function (req, res) {
    instructorinput.findById(req.params.id, function (err, list3) {
        if (err) return res.json({success: false, message: err});
        res.render("partials/instructor/instructor-info-input", {data: list3});
    });
});
//show
app.get('/instructor-list/:id', function (req, res) {
    instructorinput.findById(req.params.id, function (err, list3) {
        if (err) return res.json({success: false, message: err});
        res.render("partials/instructor/instructor-info", {data: list3});
    });
});
//edit
app.get('/instructor-list/:id/edit', function (req, res) {
    instructorinput.findById(req.params.id, function (err, list3) {
        if (err) return res.json({success: false, message: err});
        res.render("partials/instructor/instructor-list", {data: list3});
    });
});
//update
app.put('/instructor-list/:id', function (req, res) {
    req.body.post.updatedAt = Date.now();
    instructorinput.findByIdAndUpdate(req.params.id, req.body.post, function (err, list3) {
        if (err) return res.json({success: false, message: err});
        res.redirect('/partials/' + req.params.id);
    });
});
//delete
app.delete('/instructor-list/:id', function (req, res) {
    instructorinput.findByIdAndRemove(req.params.id, function (err, list3) {
        if (err) return res.json({success: false, message: err});
        res.redirect('/partials/instructor/instructor-list');
    });
});

//start server
app.listen(80, function () {
    console.log('Server listening at port:80');
});
