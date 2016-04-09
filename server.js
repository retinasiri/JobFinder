/**
 * Created by jeefer on 3/29/16.
 */

var express = require('express');
var mongoose = require('mongoose');
var jobModels = require('./models/Job');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req, res){
    mongoose.model('Job').find({}).exec(function(error, collection){
        res.send(collection);
    });
});

app.get('*', function(req, res){
    res.render('index');
});

//app.get('/', function(req, res){
//    res.render('index');
//});

mongoose.connect("mongodb://dev:devops123@93.188.161.44:27017/test");

var con = mongoose.connection;

con.once('open', function(){
   console.log('connect to mongodb successfully!');
    jobModels.seedJobs();
});


app.listen(process.env.PORT, process.env.IP);
